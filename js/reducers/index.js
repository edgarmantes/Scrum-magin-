var actions = require('../actions/index');

var initialCardState = {
	entries: ["testing state 1", "testing state 2", "testing state 3", "testing state 4"],
	taskList: [],
	devList: [],
	testList: [],
	releaseList: []
};

var scrumReducer = function(state, action){
	state = state || initialCardState;

	if (action.type === actions.ADD_ENTRY){ // Back Log reducer 

		var newArray = state.entries.concat(action.entry)

		return Object.assign({}, state, {entries: newArray})

	} else if (action.type === actions.DELETE_ENTRY){

		var filtered = state.entries.filter(function(entry){
			return entry !== action.entry
		});
		return Object.assign({}, state, { entries: filtered});

	} else if (action.type === actions.ADD_TO_TASK_LIST){

		var filtered = state.entries.filter(function(entry){
			return entry !== action.entry
		});

		state.taskList.push(action.entry)

		return Object.assign({}, state, { entries: filtered}); //back log reducer end

	} else if (action.type === actions.BACK_LOG){	// Task list reducer

		var filtered = state.taskList.filter(function(entry){

			return entry !== action.entry
		});

		state.entries.push(action.entry)

		return Object.assign({}, state, { taskList: filtered});

	} else if (action.type === actions.ADD_TO_DEV){

		var filtered = state.taskList.filter(function(entry){

			return entry !== action.entry
		});

		state.devList.push(action.entry)

		return Object.assign({}, state, { taskList: filtered}); // Task list reducer end

	} else if (action.type === actions.BACK_TASK){ //Dev list reducer

		var filtered = state.devList.filter(function(entry){

			return entry !== action.entry
		});

		state.taskList.push(action.entry)

		return Object.assign({}, state, { devList: filtered});

	} else if (action.type === actions.FETCH_CARDS){
		console.log('testing FETCH_CARDS')
		return state
		
	} else if (action.type === actions.FETCH_DESCRIPTION_SUCCESS) {   // ***

        return Object.assign({}, state, { cards : action })
    }
    else if (action.type === actions.FETCH_DESCRIPTION_ERROR) {   // ***
		
		return state
    }

	return state;
};

exports.scrumReducer = scrumReducer;