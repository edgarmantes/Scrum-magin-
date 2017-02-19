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
	// var parsed = JSON.parse(entry)
	return {
		type: BACK_DEV,
		entry: entry // parsed
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
var getProjects = function(userid){

	return function(dispatch){

		return fetch('/projects', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				},
				body: JSON.stringify(userid)
			}).then(function(response){

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}

				return response.json();

			}).then(function(response){

				return response

			}).then(function(userObject){

				return dispatch(
					getProjectsSuccess(userObject)
				);

			}).catch(function(error){

				return dispatch(
					getProjectsError(error)
				)

			});

	};
};



var fetchUser = function(objects){

	return function(dispatch){

		return fetch('/users', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				}, 
				credentials: 'same-origin',
				cache: 'default',
				body: JSON.stringify(objects)
			}).then(function(response){
				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}

				return response.text();

			}).then(function(data){

				var userId = data._id;

				localStorage.setItem('userId', userId)
				setTimeout(function(){
					hashHistory.push('home')
				},1500)
				return dispatch(
					getUserSuccess(userId)
				);

			}).catch(function(error){

				return dispatch(
					getUserError(error)
				)

			});

	};
};

var getUser = function(cred){

	return function(dispatch){
		return fetch('/hidden', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				}, 
				credentials: 'same-origin',
				body: JSON.stringify(cred)
			}).then(function(response){

				var url = response.url;
				var split = url.split('/');
				var userId = split[4];
				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
				
				return userId;

			}).then(function(userId){

				localStorage.setItem('userId', userId)
				setTimeout(function(){
					hashHistory.push('home')
				},1500)
				return dispatch(
					getUserSuccess(userId)
				);

			}).catch(function(error){

				return dispatch(
					getUserError(error)
				)

			});

	};
};

var createProject = function(newProject){
	console.log(267, 'actions', newProject)
	return function(dispatch){

		return fetch('/createproject', 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
				}, 
				// mode: 'cors',
				// cache: 'default',
				body: JSON.stringify(newProject)
			}).then(function(response){
				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(project){
				console.log(290, project)
				hashHistory.push('home')
				return dispatch(
					createProjectSuccess(project)
				);

			}).catch(function(error){

				return dispatch(
					createProjectError(error)
				)

			});

	};
};


	// object, endpoint, to, from, projectName
var move = function(creds, callback){
	
	return function(dispatch){
		var sendInfo = {
			payload: { 
				object: creds.object,
				to: creds.to,
				from: creds.from,
				projectName: creds.projectName
			},
			endpoint: creds.endpoint
		}

		return fetch( sendInfo.endpoint, 
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
					// 'x-access-token': localStorage.getItem('token');
				}, 
				body: JSON.stringify(sendInfo.payload)
			}).then(function(response){
				console.log(325, response)

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(object){
				console.log(336, object, callback)

				return dispatch(
					callback(object)
				);

			}).catch(function(error){
				console.log(342, error)
				return error
				// return dispatch(
				// 	createProjectError(error)
				// )

			});

	};

};

var loadThisProject = function(createProjectId){
	return function(dispatch){

		var sendProject = { _id: createProjectId}

		return fetch('/loading', 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
					}, 

					body: JSON.stringify(sendProject)
				}).then(function(response){

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(project){

				return dispatch(
					loadEntriesSuccess(project)
				);

			}).catch(function(error){
				return error

			});
	}		
};

var loadThisBoard = function(createProjectId){
	return function(dispatch){

		var sendProject = { _id: createProjectId}

		return fetch('/loadboard', 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
					}, 

					body: JSON.stringify(sendProject)
				}).then(function(response){

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(project){

				return dispatch(
					loadBoardSuccess(project)
				);

			}).catch(function(error){

				return error

			});
	}		
};

var loadThisDoneList = function(createProjectId){
	return function(dispatch){

		var sendProject = { _id: createProjectId}

		return fetch('/loadlist', 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
					}, 
					body: JSON.stringify(sendProject)
				}).then(function(response){

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(project){
				console.log(454, project)
				return dispatch(
					loadDoneListSuccess(project)
				);

			}).catch(function(error){
				return error

			});
	}		
};

var addNotes = function(notes){
	return function(dispatch){

		var sendProject = { 
			_id: localStorage.createProjectId,
			dailyNotes: notes
		}

		return fetch('/notes', 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
					}, 
					body: JSON.stringify(sendProject)
				}).then(function(response){

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(project){
				console.log(454, project)

				return project
				// return dispatch(
				// 	loadDoneListSuccess(project)
				// );

			}).catch(function(error){
				return error

			});
	}	
};

var getNotes = function(){
	return function(dispatch){

		var sendProject = { 
			_id: localStorage.createProjectId
		}

		return fetch('/notes/daily', 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
					}, 
					body: JSON.stringify(sendProject)
				}).then(function(response){

				if (response.status < 200 || response.status >= 300){
					var error = new Error (response.statusText)
					error.response = response
					throw error;
				}
			
				return response.text();

			}).then(function(notes){


				return dispatch(
					getNotesSuccess(notes)
				);

			}).catch(function(error){
				return error

			});
	}	
};

var CREATE_PROJECT_SUCCESS = 'CREATE_PROJECT_SUCCESS';
var createProjectSuccess = function(project) {
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
var getProjectsSuccess = function(userObject) {
    return {
        type: GET_PROJECTS_SUCCESS,
        userObject : userObject
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
var fetchDescriptionSuccess = function(data) {
    return {
        type: FETCH_DESCRIPTION_SUCCESS,
        user : data
    };
};


var FETCH_DESCRIPTION_ERROR= 'FETCH_DESCRIPTION_ERROR';
var fetchDescriptionError = function(error) {
    return {
        type: FETCH_DESCRIPTION_ERROR,

        error: error
    };
};


var GET_USER_SUCCESS = 'GET_USER_SUCCESS';
var getUserSuccess = function(userId){
	return {
		type: GET_USER_SUCCESS,
		userId: userId
	}
};

var GET_USER_ERROR = 'GET_USER_ERROR';
var getUserError = function(err){
	return {
		type: GET_USER_ERROR,
		error: err
	}
};

var LOAD_ENTRIES_SUCCESS = 'LOAD_ENTRIES_SUCCESS'
var loadEntriesSuccess = function(entries){
	return {
		type: LOAD_ENTRIES_SUCCESS,
		entries: entries
	}
};

var LOAD_BOARD_SUCCESS = 'LOAD_BOARD_SUCCESS';
var loadBoardSuccess = function(project){

	return {
		type: LOAD_BOARD_SUCCESS,
		project: project
	}
};

var LOAD_DONE_LIST_SUCCESS = 'LOAD_DONE_LIST_SUCCESS';
var loadDoneListSuccess = function(donelist){

	return {
		type: LOAD_DONE_LIST_SUCCESS,
		doneList: donelist
	}
};

var GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS';
var getNotesSuccess = function(notes){

	return {
		type: GET_NOTES_SUCCESS,
		notes: notes
	}
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
exports.GET_USER_SUCCESS = GET_USER_SUCCESS;
exports.getUserSuccess = getUserSuccess;
exports.GET_USER_ERROR = GET_USER_ERROR;
exports.getUserError = getUserError;
exports.GET_PROJECTS_SUCCESS = GET_PROJECTS_SUCCESS;
exports.getProjectsSuccess = getProjectsSuccess;
exports.GET_PROJECTS_ERROR = GET_PROJECTS_ERROR;
exports.getProjectsError = getProjectsError;
exports.LOAD_ENTRIES_SUCCESS = LOAD_ENTRIES_SUCCESS;
exports.loadEntriesSuccess = loadEntriesSuccess;
exports.LOAD_BOARD_SUCCESS = LOAD_BOARD_SUCCESS;
exports.loadBoardSuccess = loadBoardSuccess;
exports.LOAD_DONE_LIST_SUCCESS = LOAD_DONE_LIST_SUCCESS;
exports.loadDoneListSuccess = loadDoneListSuccess
exports.GET_NOTES_SUCCESS = GET_NOTES_SUCCESS;
exports.getNotesSuccess = getNotesSuccess;


exports.fetchUser = fetchUser;
exports.createProject = createProject;
exports.getUser = getUser;
exports.move = move;
exports.loadThisProject = loadThisProject;
exports.loadThisBoard = loadThisBoard;
exports.loadThisDoneList = loadThisDoneList;
exports.addNotes = addNotes;
exports.getNotes = getNotes;