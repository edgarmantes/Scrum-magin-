var mongoose = require('mongoose');
var createProject = require('./create-project')
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    projects: [ { type: Schema.Types.ObjectId, ref: 'CreateProject' } ]
});

UserSchema.methods.validatePassword = function(password, callback) {
    var isvalid = null;
    bcrypt.compare(password, this.password, function(err, isValid) {

        if (err) {
            console.log(17, err);
            callback(err, null);
        }
        callback(null, isValid);
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
