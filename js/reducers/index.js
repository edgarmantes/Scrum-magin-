var actions = require('../actions/index');

var initialCardState = {
	entries: ["testing state"]
};

var scrumReducer = function(state, action){
	state = state || initialCardState;

	if (action.type === actions.ADD_ENTRY){
		var newArray = state.entries.concat(action.entry)

		return Object.assign({}, state, {entries: newArray})
	} else if (action.type === actions.DELETE_ENTRY){

		var i = state.entries.indexOf(action.entry)
		console.log(i)
		var newState = state.entries.splice(i, 1)
		console.log(newState)
		return Object.assign({}, state, {entries: newState})


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