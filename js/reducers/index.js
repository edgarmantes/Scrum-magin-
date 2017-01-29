var actions = require('../actions/index');

var initialCardState = {
	cards: []
};

var timerReducer = function(state, action){
	state = state || initialCardState;

	if (action.type === actions.FETCH_CARDS){
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

exports.timerReducer = timerReducer;