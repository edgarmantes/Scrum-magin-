var express = require('express');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

// Schema models
var User = require('./models/user');
var CreateProject = require('./models/create-project')
var config = require('./config');
var app = express();

mongoose.Promise = global.Promise;  // Use this code because mongoose.Promise has been deprecated and global.Promise is taking its place.

app.use(express.static('build'));
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

passport.use(new LocalStrategy(     // LocalStrategy will parse the username and password from the req.body and pass it on to the inside function.
    function(username, password, done) {
        // User.findOne({username: username, password: password}, function(err, user){
        //     if (err) { return done(err) }
        //     if (!user) {return done(null, false)}
        //     return done(null, user);
        // });


        User.findOne({ username: username }, function (err, user) { // First this searches for an existing username that was provided
            
            if (err) {  // if there was an issue besides 'nonexisting user' the error message will be passed in here. 
                return done(err); 
            }
            if (!user) {        // If no username found this err will be thrown
                return done(null, false, { message: 'Incorrect username.' });
            }

            user.validatePassword(password, function(err, isValid){  // If username is found in the db this will authenticate the submitted password with the db password on file. The validatePassword() method is a method from the User model. 
                if (err) { // if there was an issue besides 'invalid password' the error message will be passed in here. 
                    return done(null, false, err);
                } 

                if (!isValid) {         // If password submitted is incvalid this err will be thrown
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user); 
                    // If password passes authentication this 'done()' function will be called passing in 'null' (for 'error' argument) and 'user' for the 
            });
        });                         // Once this function completes the serializeUser() is invoked and continues from there
    }
));


// passport.serializeUser(function(user, done) {
//     console.log(58, user._id) 
//     done(null, user)
// });

// passport.deserializeUser(function(id, done){
//     console.log(63, id)
//     User.findById(user._id, function(err, user){
//         console.log(65, user)
//         done(err, user);
//     });
// });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
        secret: 'blahblahblahblah-Trump', 
        cookie: {maxAge: 60000},
        resave: false, 
        saveUninitialized: true,
        store: new MongoStore({ url: config.DATABASE_URL }),

    })  
);
// app.use(passport.initialize());
// app.use(passport.session());

// Beginning routes

app.options('*', function(req, res){
    res.status(200)
});

app.get('/test', function(){
    console.log('testing server')
})

// app.post('/hidden', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info) {
//         if (err) {
//             return res.status(500).json({message: 'something broke' });
//         } else if (!info) {

//             return res.status(401).json({message: 'unauthorized'});
//         } else {
//             req.login(user, function(err) {
//                 if (err) {
//                     return res.status(500)
//                 } else {
//                     res.redirect('/')
//                     return res.status(200).json(user)
//                 }
//             })
//         }
//     })(req, res, next);
// });


// Authenticate user supplied sign In credentials
// app.post('/hidden', passport.authenticate('local'), function(req, res){
//                     //  - when a call gets made to '/hidden' endpoint passport.authenticate('local'). The info in the req.body will be parsed by the LocalStrategy method
//     // console.log(112, req.user) req.user is able to see req.user object
//     console.log(121, req.user)
//     req.logIn(req.user, function(err){
//         res.redirect('/')
//     })
//     res.status(211)
//     // var user = req.body;
//     // User.findOne({username: user.username, password: user.password}, function(err, foundUser){
//     //     // res.addHeader('s:', user._id)
//     //     res.json(foundUser)
//     // })
// });

// function checkSignIn(req, res){
//     console.log(168, req.session.userId)
//     if (req.session.userId){
//         console.log(169, 'checkSignIn has passed')
//         return res.status(200);
//     } else {
//         console.log(171, 'checkSignIn did not pass')
//         return res.status(402)
//     }
// };



app.post('/hidden', function(req, res){
                    //  - when a call gets made to '/hidden' endpoint passport.authenticate('local'). The info in the req.body will be parsed by the LocalStrategy method
    console.log(176, req.session) //req.user is able to see req.user object

        User.findOne({ username: req.body.username }, function (err, user) { // First this searches for an existing username that was provided
            
            if (err) {  // if there was an issue besides 'nonexisting user' the error message will be passed in here. 
                return res.status(500).json({ message: 'Internal Server Error. Did not validate Username.' }) 
            }
            if (!user) {        // If no username found this err will be thrown
                return res.status(401).json({ message: 'Incorrect username.' });
            }

            user.validatePassword(req.body.password, function(err, isValid){  // If username is found in the db this will authenticate the submitted password with the db password on file. The validatePassword() method is a method from the User model. 
                if (err) { // if there was an issue besides 'invalid password' the error message will be passed in here. 
                    return res.status(500).json({ message: 'Internal Server Error. Did not validate.' }) 
                } 

                if (!isValid) {         // If password submitted is incvalid this err will be thrown
                    return res.status(401).json({ message: 'Incorrect password.' });
                }
                console.log(187, 'login authenticated')
                req.session.userId = user._id;
                console.log(190, req.session)
                res.redirect('/protected_page')
                // return res.status(210).json(user)
            });
        });  
});

app.get('/protected_page', function(req, res){
    console.log(220, req.session)
    req.session.userId = req.session.userId;
    res.status(200).cookie('userId', req.session.userId).json({msg:'working'})
});

app.get('/projects', function(req, res){
    console.log(205, req.session)
    res.status(200).json({message:'projects has completed'})
    // User.findOne(req.session.user._id)
    //     .populate('projects')
    //     .exec(function(err, data){
    //         console.log(data)
    //     })
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



app.post('/createproject', function(req, res){
    console.log(224)
    CreateProject.create({
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectLeader: req.body.projectLeader,
                scrumMaster: req.body.scrumMaster,
                crew: req.body.crew

        }, function(err, object){
            console.log(230 )
            if (err){
                return res.status(500).json({
                    message: 'did not create the project. Internal Server Error'
                });
            }

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