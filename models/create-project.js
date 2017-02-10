var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreateProjectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    projectLeader: { type: String, required: true },
    scrumMaster: { type: String, required: true },
    crew: { type: String, required: true },
});

var CreateProject = mongoose.model('CreateProject', CreateProjectSchema);

module.exports = CreateProject;