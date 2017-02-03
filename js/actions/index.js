var fetch = require('isomorphic-fetch');

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



var FETCH_DESCRIPTION_SUCCESS = 'FETCH_DESCRIPTION_SUCCESS';
var fetchDescriptionSuccess = function(object, cards) {
    return {
        type: FETCH_DESCRIPTION_SUCCESS,
        cards : [cards]
    };
};

var FETCH_DESCRIPTION_ERROR= 'FETCH_DESCRIPTION_ERROR';
var fetchDescriptionError = function(object, error) {
    return {
        type: FETCH_DESCRIPTION_ERROR,

        error: error
    };
};

var fetchCards = function(object){
		console.log('test fetchfunction')	
	return function(dispatch){

		return fetch('http://localhost:8080/home', { method: 'GET'}).then(function(response){

			if (response.status < 200 || response.status >= 300){
				var error = new Error (response.statusText)
				error.response = response
				throw error;
			}
			console.log(response)
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
				fetchDescriptionError(object, error)
			)

		});
	};
};


// var fetchDescription = function(object){
// 	return function(dispatch){

// 		return fetch('http://localhost:8080/fewest-guesses', { method: 'GET' }).then(function(response){

// 			if (response.status < 200 || response.status >= 300){
// 				var error = new Error (response.statusText)
// 				error.response = response
// 				throw error;
// 			}
// 			return response.text();

// 		}). then(function(response){
// 			console.log(response)
// 			document.getElementById('fewestNumber').innerHTML = response;
// 			return response



// 		}).then(function(data){

// 			var description = data;
// 			return dispatch(
// 				fetchDescriptionSuccess(object, description)
// 			);

// 		}).catch(function(error){

// 			return dispatch(
// 				fetchDescriptionError(object, error)
// 			)

// 		});
// 	};

// };


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

exports.FETCH_DESCRIPTION_SUCCESS = FETCH_DESCRIPTION_SUCCESS;
exports.fetchDescriptionSuccess = fetchDescriptionSuccess;
exports.FETCH_DESCRIPTION_ERROR = FETCH_DESCRIPTION_ERROR;
exports.fetchDescriptionError = fetchDescriptionError;

exports.fetchCards = fetchCards;