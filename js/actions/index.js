var fetch = require('isomorphic-fetch');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var RESET_STATE = 'RESET_STATE';
var resetState = function(){
	return {
		type: RESET_STATE
	}
};


var ADD_ENTRY = 'ADD_ENTRY';
var addEntry = function(entry){
	return {
		type: ADD_ENTRY,
		entry: entry
	}
};

var ADD_TO_TASK_LIST = 'ADD_TO_TASK_LIST';
var addToTaskList = function(entry){
	return {
		type: ADD_TO_TASK_LIST,
		entry: entry
	}
};


var DELETE_ENTRY = 'DELETE_ENTRY';
var deleteEntry = function(entry){
	return {
		type: DELETE_ENTRY,
		entry: entry
	}
};


var BACK_LOG = 'BACK_LOG';
var backLog = function(entry){
	return {
		type: BACK_LOG,
		entry: entry
	}
};


var ADD_TO_DEV = 'ADD_TO_DEV';
var addToDev = function(entry){
	return {
		type: ADD_TO_DEV,
		entry: entry
	}
};


var BACK_TASK = 'BACK_TASK';
var backTask = function(entry){
	console.log('test back_task')
	return {
		type: BACK_TASK,
		entry: entry
	}
};


var ADD_TO_TEST = 'ADD_TO_TEST';
var addToTest = function(entry){
	return {
		type: ADD_TO_TEST,
		entry: entry
	}
};


var BACK_DEV = 'BACK_DEV';
var backDev = function(entry){
	return {
		type: BACK_DEV,
		entry: entry
	}
};


var ADD_TO_RELEASE = 'ADD_TO_RELEASE';
var addToRelease = function(entry){
	return {
		type: ADD_TO_RELEASE,
		entry: entry
	}
};


var BACK_TEST = 'BACK_TEST';
var backTest = function(entry){
	console.log('test action')
	return {
		type: BACK_TEST,
		entry: entry
	}
};


var ADD_TO_DONE = 'ADD_TO_DONE';
var addToDone = function(entry){
	console.log('test actions')
	return {
		type: ADD_TO_DONE,
		entry: entry
	}
};

var ADD_MEMBER = 'ADD_MEMBER';
var addMember = function(member){
	console.log('testing member action')
	return{
		type: ADD_MEMBER,
		member: member
	}
};


var GET_PROJECTS = 'GET_PROJECTS';
var getProjects = function(){
		console.log('test GET_PROJECTS')

	return function(dispatch){
		console.log('test for dispatch')
		return fetch('http://localhost:8080/projects', 
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				}
			}).then(function(response){
				console.log(response.status)
				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
				hashHistory.push('home')
				return response.text();

			}).then(function(response){

				return response

			}).then(function(data){

				var cards = data;
				return dispatch(
					getProjectsSuccess(object, cards)
				);

			}).catch(function(error){

				return dispatch(
					getProjectsError(error)
				)

			});

	};
};

var fetchUser = function(objects){
		console.log('test fetchfunction ' + JSON.stringify(objects))

	return function(dispatch){

		return fetch('http://localhost:8080/users', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				}, 
				mode: 'cors',
				cache: 'default',
				body: JSON.stringify(objects)
			}).then(function(response){
				console.log(response.status)
				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
				hashHistory.push('home')
				return response.text();

			}).then(function(response){

				return response

			}).then(function(data){

				var cards = data;
				return dispatch(
					fetchDescriptionSuccess(object, cards)
				);

			}).catch(function(error){

				return dispatch(
					fetchDescriptionError(error)
				)

			});

	};
};

var createProject = function(objects){
		console.log('test fetchfunction ' + JSON.stringify(objects))

	return function(dispatch){
		console.log('test for dispatch')
		return fetch('http://localhost:8080/createproject', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				}, 
				mode: 'cors',
				cache: 'default',
				body: JSON.stringify(objects)
			}).then(function(response){
				console.log(response.status)
				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
				hashHistory.push('home')
				return response.text();

			}).then(function(response){

				return response

			}).then(function(data){

				var cards = data;
				return dispatch(
					CreateProjectSuccess(object, cards)
				);

			}).catch(function(error){

				return dispatch(
					CreateProjectError(error)
				)

			});

	};
};



var CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
var createProjectSuccess = function(object, project) {
    return {
        type: CREATE_PROJECT_SUCCESS,
        project : project
    };
};


var CREATE_PROJECT_ERROR= 'CREATE_PROJECT_ERROR';
var createProjectError = function(error) {
    return {
        type: CREATE_PROJECT_ERROR,

        error: error
    };
};

var GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
var getProjectSuccess = function(object, project) {
    return {
        type: GET_PROJECTS_SUCCESS,
        project : project
    };
};


var GET_PROJECTS_ERROR= 'GET_PROJECTS_ERROR';
var getProjectsError = function(error) {
    return {
        type: GET_PROJECTS_ERROR,

        error: error
    };
};


var FETCH_DESCRIPTION_SUCCESS = 'FETCH_DESCRIPTION_SUCCESS';
var fetchDescriptionSuccess = function(object, projects) {
    return {
        type: FETCH_DESCRIPTION_SUCCESS,
        projects : projects
    };
};


var FETCH_DESCRIPTION_ERROR= 'FETCH_DESCRIPTION_ERROR';
var fetchDescriptionError = function(error) {
    return {
        type: FETCH_DESCRIPTION_ERROR,

        error: error
    };
};


exports.RESET_STATE = RESET_STATE;
exports.resetState = resetState;
exports.ADD_ENTRY = ADD_ENTRY;
exports.addEntry = addEntry;
exports.DELETE_ENTRY = DELETE_ENTRY;
exports.deleteEntry = deleteEntry;
exports.ADD_TO_TASK_LIST = ADD_TO_TASK_LIST;
exports.addToTaskList = addToTaskList;

exports.BACK_LOG = BACK_LOG;
exports.backLog = backLog;
exports.ADD_TO_DEV = ADD_TO_DEV;
exports.addToDev = addToDev;
exports.BACK_TASK = BACK_TASK;
exports.backTask = backTask;
exports.ADD_TO_TEST = ADD_TO_TEST;
exports.addToTest = addToTest;
exports.BACK_DEV = BACK_DEV;
exports.backDev = backDev;
exports.ADD_TO_RELEASE = ADD_TO_RELEASE;
exports.addToRelease = addToRelease;
exports.BACK_TEST = BACK_TEST;
exports.backTest = backTest;
exports.ADD_TO_DONE = ADD_TO_DONE;
exports.addToDone = addToDone;
exports.ADD_MEMBER = ADD_MEMBER;
exports.addMember = addMember;
exports.createProject = createProject;
exports.GET_PROJECTS = GET_PROJECTS;
exports.getProjects = getProjects;


exports.CREATE_PROJECT_SUCCESS = CREATE_PROJECT_SUCCESS;
exports.createProjectSuccess = createProjectSuccess
exports.CREATE_PROJECT_ERROR = CREATE_PROJECT_ERROR;
exports.createProjectError = createProjectError
exports.FETCH_DESCRIPTION_SUCCESS = FETCH_DESCRIPTION_SUCCESS;
exports.fetchDescriptionSuccess = fetchDescriptionSuccess;
exports.FETCH_DESCRIPTION_ERROR = FETCH_DESCRIPTION_ERROR;
exports.fetchDescriptionError = fetchDescriptionError;

exports.fetchUser = fetchUser;
exports.createProject = createProject;