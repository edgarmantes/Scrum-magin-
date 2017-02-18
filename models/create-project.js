var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreateProjectSchema = new mongoose.Schema({
    projectName: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    projectLeader: { type: String },
    scrumMaster: { type: String },
    crew: { type: String },
    userid: { type: String },
    entries: [{ type: String }],
	taskList: [{ type: String }],
	devList: [{ type: String }],
	testList: [{ type: String }],
	releaseList: [{ type: String }],
	doneList: [{ type: String }],
	crew:[{ type: String }],
    dailyNotes: { type: String }
});

var CreateProject = mongoose.model('CreateProject', CreateProjectSchema);

module.exports = CreateProject;