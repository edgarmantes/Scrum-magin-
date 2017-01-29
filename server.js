var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var config = require('./config');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var jsonParser = bodyParser.json();
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());


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


// This is the setup for Passport.js authentication
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


// Add all the models required for the DataBase here:
// example:
	// var LogRoom = require('./models/LogRoom');
	// var Entries = require('./models/Entries');
	// var User = require('./models/User');


// 

// Routes required for Passport.js. It includes salted hashes
app.post('/users', jsonParser, function(req, res) {
	// 'User' is an example of the user model for MongoDB. That is the collection .findOne() will look into for the requested information.
    User.findOne({username: req.body.usernameup}, function(err, user){
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        if (user !== null){
            return res.status(422).json({
                message: 'Username taken: Please choose another username'
            });
        }

        if (!req.body) {
            return res.status(400).json({
                message: "No request body"
            });
        }

        if (!('usernameup' in req.body)) {
            return res.status(422).json({
                message: 'Missing field: username'
            });
        }

        var username = req.body.usernameup;

        if (typeof username !== 'string') {
            return res.status(421).json({
                message: 'Incorrect field type: username'
            });
        }

        username = username.trim();

        if (username === '') {
            return res.status(422).json({
                message: 'Incorrect field length: username'
            });
        }

        if (!('passwordup' in req.body)) {
            return res.status(423).json({
                message: 'Missing field: password'
            });
        }

        var password = req.body.passwordup;

        if (typeof password !== 'string') {
            return res.status(424).json({
                message: 'Incorrect field type: password'
            });
        }

        password = password.trim();

        if (password === '') {
            return res.status(425).json({
                message: 'Incorrect field length: password'
            });
        }

        var userId = null;

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

                user.save(function(err, user) {

                    if (err) {
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                    userId = user._id;
                    return res.status(201).json(userId);
                });
            });
        });

    })   
});

// Used to sign in for existing users. This is the login endpoint
app.post('/users/signin', jsonParser, function(req, res){
	// 'User' is an example of the user model for MongoDB. That is the collection .findOne() will look into for the requested information.
    User.findOne({username: req.body.usernamein}, function(err, object){

        object.validatePassword(req.body.passwordin, function(err, result){
            res.status(201).json(object._id);
        })
    })

});

// This is used for new users who are sigin up. Creates new documents in the db. 
app.post('/user', function(req, res){
	User.create({
		username: req.body.username,
		logroomIds: [],
	}, function(err, object){
		    if (err) {
            	return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(object);
	})
});

// Add the application methods and endpoints here:


// ...


// Used for error handling. If a request was made to a non-existing endpoint this will be returned
app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});