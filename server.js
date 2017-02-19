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

// Beginning routes

app.options('*', function(req, res){
    res.status(200)
});

app.get('/test', function(){
    console.log('testing server')
})


// End point for existing user to log in and authenticate
app.post('/hidden', function(req, res){

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
                req.session.user = user
                console.log(187, 'login authenticated')
                res.redirect('/protected_page/' + user._id)
            });
        });  
});

//  User ID is passed through the params from the '/hidden' endpoint
app.get('/protected_page/:userId', function(req, res){
    res.status(200).json({userId:req.params.userId})
});



// Create new users
app.post('/users', function(req, res) {

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


// Passes in userid to retrieve their list of current projects
app.post('/projects', function(req, res){
    var userid = String(req.body.userid)
    User.findOne({ _id: userid})
        .populate('projects')   // finds the projects object._id and references the createProject model
        .exec(function(err, data){

            res.status(200).json(data)
        })
});


// create new project
app.post('/createproject', function(req, res){
    var newProject = {
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                projectLeader: req.body.projectLeader,
                scrumMaster: req.body.scrumMaster,
                crew: req.body.crew,
                userid: req.body.userid
        }

    CreateProject.create(newProject, function(err, object){


            if (err){
                return res.status(500).json({
                    message: 'did not create the project. Internal Server Error'
                });
            }

            User.findOneAndUpdate(
                {_id: object.userid},
                {$push:{'projects': object._id}}, // pushes newly created objects object._id into users project list
                function(err, user){
                    if (err) {
                        return res.status(502).json({
                            message: 'Internal Server Error'
                        })
                    }

                }
            )
            res.status(200).json(object)
        }
    )

})


// This function is called after a request to move an entry from one list to another on the database
function CreateProjectUpdate(req, res, update){

    CreateProject.findOneAndUpdate(
        {projectName: req.body.projectName}, update,
        function(err, object){
    
            if(err){
                return res.status(500).json({
                message: 'Internal Server Error'
                })
            }
    })

    return
}


// used to move/remove payload from one section of the scrum board to another updating the redux store
app.post('/move', function(req, res){

    
    var updateTo = null;
    var updateFrom = null;
    // When 'to' is passed in, this 'move' function will push object into the 'to' location.
    if (req.body.to === 'entries') {

       updateTo = {$push:{ 'entries' : req.body.object }}
       CreateProjectUpdate(req, res, updateTo)

    } else if (req.body.to === 'taskList') {

        updateTo = {$push:{ 'taskList' : req.body.object }}
        CreateProjectUpdate(req, res, updateTo)

    } else if (req.body.to === 'devList') {

        updateTo = {$push:{ 'devList' : req.body.object }}
        CreateProjectUpdate(req, res, updateTo)
    } else if (req.body.to === 'testList') {

        updateTo = {$push:{ 'testList' : req.body.object }}
        CreateProjectUpdate(req, res, updateTo)
    } else if (req.body.to === 'releaseList') {

        updateTo = {$push:{ 'releaseList' : req.body.object }}
        CreateProjectUpdate(req, res, updateTo)
    } else if (req.body.to === 'doneList') {

        updateTo = {$push:{ 'doneList' : req.body.object }}
        CreateProjectUpdate(req, res, updateTo)
    }



    // When 'from' is assigned, the move function will remove the object 'from' the list of which it is currently moved out of.
    if (req.body.from === 'entries'){

        updateFrom = {$pull:{ 'entries' : req.body.object }}
        CreateProjectUpdate(req, res, updateFrom)

    } else if (req.body.from === 'taskList'){

        updateFrom = {$pull:{ 'taskList' : req.body.object }}
        CreateProjectUpdate(req, res, updateFrom)

    } else if (req.body.from === 'devList'){

        updateFrom = {$pull:{ 'devList' : req.body.object }}
        CreateProjectUpdate(req, res, updateFrom)

    } else if (req.body.from === 'testList'){

        updateFrom = {$pull:{ 'testList' : req.body.object }}
        CreateProjectUpdate(req, res, updateFrom)

    } else if (req.body.from === 'releaseList'){

        updateFrom = {$pull:{ 'releaseList' : req.body.object }}
        CreateProjectUpdate(req, res, updateFrom)

    }

    return res.status(200).json(req.body.object)
})


// After clicking on a specific project, this endpoint is called and retrieves the entries of each list in the scrum project and sends the informations back to the client
app.post('/loading', function(req, res){

    CreateProject.findOne({_id: req.body._id}, function(err, project){
        var entries = project.entries;

        return res.status(200).json(entries)
    })

});


//  sends the Done List
app.post('/loadlist', function(req, res){


    CreateProject.findOne({_id: req.body._id}, function(err, project){

        var doneList = project.doneList;

        return res.status(200).json(doneList)
    })


});

//  Updates the DB with entries for each list
app.post('/loadboard', function(req, res){

    CreateProject.findOne({_id: req.body._id}, function(err, project){

        var newBoard = {
            taskList: project.taskList, 
            devList: project.devList, 
            testList: project.testList,
            releaseList: project.releaseList,
        }
        return res.status(200).send(newBoard)
    })

});


// Updates the DB notes section
app.post('/notes', function(req, res){

    CreateProject.findOneAndUpdate({_id: req.body._id}, {dailyNotes: req.body.dailyNotes}, {upsert:true}, function(err, project){
        if (err) {return res.send(500, { error: err })};

        return res.status(200).json({dailyNotes: req.body.dailyNotes});
    })  
})


// Finds the notes for the project and sends it back to the client
app.post('/notes/daily', function(req, res){

    CreateProject.findOne({_id: req.body._id}, function(err, project){
        if (err) {
            return res.send(500, { error: err })
        };

        return res.status(200).json({dailyNotes: project.dailyNotes});
    })  
})

// Used for error handling. If a request was made to a non-existing endpoint this will be returned
app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});