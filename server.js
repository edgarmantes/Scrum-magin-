var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var session = require('client-sessions');
// Schema models
var User = require('./models/user');
var CreateProject = require('./models/create-project')

var config = require('./config');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var app = express();

mongoose.Promise = global.Promise;  // Use this code because mongoose.Promise has been deprecated and global.Promise is taking its place.
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(passport.initialize());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// sessions middleware - configuration of handler
app.use(session({
    cookieName: 'session',
    secret: 'blahdeeblahdeeblah-Trump',
    duration: 30*60*1000,
    activeDuration: 30*60*1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

// session middleware - making the middleware global
app.use(function(req, res, next){
            console.log(42, req.session)
    if (req.session && req.session.user){
        console.log(43, 'set up global session ' +req.session.user)
        User.findOne({username: req.session.user.username}, function(err, user){
            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = user;

            }
            next();
        });
    } else {
        next();
    }
})

// session middleware - function to pass to routesto check for open sessions
function requireLogin(req, res, next){
    if (!req.user) {
        console.log('requireLogin has no req.user')
        res.status(401); // send this status code to inform client that person is not signed in.
    } else {
        next();
    }
};

// middleware to run as a module or as a server. 
// This setup the connection to the server and the server to the DB.
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

// If this file was 'required' on another file as a module then this file will run
if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;


var strategy = new BasicStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }

        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }

        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);

// Beginning routes

app.options('*', function(req, res){
    res.status(200)
});

app.get('/test', function(){
    console.log('testing server')
})

// Authenticate user supplied sign In credentials
app.get('/hidden', passport.authenticate('basic', {session: false}), function(req, res) {
    res.json({
        message: 'Luke... I am your father'
    });
});

// Create new users
app.post('/users', function(req, res) {
    console.log('server received ' + req.body.username)

    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }


    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash
            });

            user.save(function(err, object) {
                req.session.user = object;
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }

                return res.status(201).json(object); // new user has been created successfully
            });
        });
    });
});


app.get('/projects', requireLogin, function(req, res){
    User.findOne(req.session.user._id)
        .populate('projects')
        .exec(function(err, data){
            console.log(data)
        })
});

app.post('/createproject', requireLogin, function(req, res){
    console.log(234, 'server received ' + req.body)
    CreateProject.create({
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectLeader: req.body.projectLeader,
                scrumMaster: req.body.scrumMaster,
                crew: req.body.crew

        }, function(err, object){
            console.log(254, err, object)
            if (err){
                return res.status(500).json({
                    message: 'did not create the project. Internal Server Error'
                });
            }

console.log(req)
            // User.findOneAndUpdate(
            //     {_id: req.session.user._id},
            //     {$push:{'projects': object._id}}, 
            //     function(err, user){
            //         if (err) {
            //             return res.status(502).json({
            //                 message: 'Internal Server Error'
            //             })
            //         }
            //     }
            // )
            res.status(200).json(object)
        }
    )

})


// Used for error handling. If a request was made to a non-existing endpoint this will be returned
app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});