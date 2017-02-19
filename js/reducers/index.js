var actions = require('../actions/index');

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var initialCardState = {
	entries: null,
	taskList: null,
	devList: null,
	testList: null,
	releaseList: null,
	doneList: null,
	crew: null,
	dailyNotes: "",

	userid: null, /*This is all the projects that the user has open*/
	projects: [],

	projectName: null,     /*This is the initial state for the Create Project page*/
	startDate: null,
	endDate: null, 
	projectLeader: null,
	scrumMaster: null,
};

var scrumReducer = function(state, action){
	state = state || initialCardState;

	if (action.type === actions.ADD_ENTRY){ // Back Log reducer 

		var newArray = state.entries.concat(JSON.parse(action.entry))

		return Object.assign({}, state, {entries: newArray})

	} else if (action.type === actions.DELETE_ENTRY){

		var filtered = state.entries.filter(function(entry){
			return entry !== action.entry
		});
		return Object.assign({}, state, { entries: filtered});

	} else if (action.type === actions.ADD_TO_TASK_LIST){

		var filtered = state.entries.filter(function(entry){
			return entry !== JSON.parse(action.entry)
		});

		state.taskList.push(action.entry)

		return Object.assign({}, state, { entries: filtered}); //back log reducer end

	} else if (action.type === actions.BACK_LOG){	// Task list reducer

		var filtered = state.taskList.filter(function(entry){

			return entry !== JSON.parse(action.entry)
		});

		state.entries.push(action.entry)

		return Object.assign({}, state, { taskList: filtered});

	} else if (action.type === actions.ADD_TO_DEV){

		var filtered = state.taskList.filter(function(entry){

			return entry !== JSON.parse(action.entry)
		});

		state.devList.push(JSON.parse(action.entry))

		return Object.assign({}, state, { taskList: filtered}); // Task list reducer end

	} else if (action.type === actions.BACK_TASK){ //Dev list reducer

		var filtered = state.devList.filter(function(entry){

			return entry !== JSON.parse(action.entry)
		});

		state.taskList.push(JSON.parse(action.entry))

		return Object.assign({}, state, { devList: filtered});

	} else if (action.type === actions.ADD_TO_TEST){

		var filtered = state.devList.filter(function(entry){

			return entry !== JSON.parse(action.entry)
		});

		state.testList.push(JSON.parse(action.entry))

		return Object.assign({}, state, { devList: filtered}); //Dev List reducer end

	} else if (action.type === actions.BACK_DEV){     // Test List reducer

		var filtered = state.testList.filter(function(entry){ 

			return entry !== JSON.parse(action.entry)
		});

		state.devList.push(JSON.parse(action.entry))

		return Object.assign({}, state, { testList: filtered});

	} else if (action.type === actions.ADD_TO_RELEASE){

		var filtered = state.testList.filter(function(entry){

			return entry !== JSON.parse(action.entry)
		});

		state.releaseList.push(JSON.parse(action.entry))

		return Object.assign({}, state, { testList: filtered}); // Test List reducer end

	} else if (action.type === actions.BACK_TEST){   //Release List reducer

		var filtered = state.releaseList.filter(function(entry){ 

			return entry !== JSON.parse(action.entry)
		});

		state.testList.push(JSON.parse(action.entry))

		return Object.assign({}, state, { releaseList: filtered});
		
	} else if (action.type === actions.ADD_TO_DONE){

		var filtered = state.releaseList.filter(function(entry){

			return entry !== JSON.parse(action.entry)
		});

		state.doneList.push(action.entry)

		return Object.assign({}, state, { releaseList: filtered});	   // release List reducer end

	} else if (action.type === actions.RESET_STATE){

		var resetCardState = {
			entries: [],
			taskList: [],
			devList: [],
			testList: [],
			releaseList: [],
			doneList: [],
			crew: [],
			dailyNotes: ""
		};
		
		return Object.assign({}, state, resetCardState)
	
	} else if (action.type === actions.ADD_MEMBER){  		/*This starts the reducers for the Create Project page*/ 

		var newArray = state.crew.concat(action.member)

		return Object.assign({},state, {crew: newArray})

	} 
	else if (action.type === actions.FETCH_CARDS){

		return state
		
	} else if (action.type === actions.CREATE_PROJECT_SUCCESS) {   // ***


		var newProjects = state.project.concat(action.project)

        return Object.assign({}, state, { projects: newProjects});
    
    } else if (action.type === actions.GET_PROJECTS){
    
    	console.log('test GET_PROJECTS')
    
    } else if (action.type === actions.GET_PROJECTS_SUCCESS){
		
		var projectObject = {	   
			projects: action.userObject.projects
		}
    	
    	return Object.assign({}, state, projectObject)
    
    } else if (action.type === actions.GET_PROJECTS_ERROR){
    	
    	return state
    
    }

    else if (action.type === actions.FETCH_DESCRIPTION_ERROR) {   // ***
		
		return state

    } else if (action.type === actions.FETCH_DESCRIPTION_SUCCESS) {   // ***
		
    	var userInfo = {
    		userId: action.user._id,
    		projects: action.user.projects
    	}

		return Object.assign({}, state, userInfo)

    } else if (action.type === actions.GET_USER_SUCCESS){

    	return Object.assign({}, state, {userid: action.userId})

    } else if (action.type === actions.GET_USER_ERROR) {

    	return state

    } else if (action.type === actions.LOAD_ENTRIES_SUCCESS) {

    	var entries = JSON.parse(action.entries);

    	return Object.assign({}, state, {entries: entries})

    } else if (action.type === actions.LOAD_BOARD_SUCCESS) {
    	
    	var project = JSON.parse(action.project)

    	return Object.assign({}, state, project)

    } else if (action.type === actions.LOAD_DONE_LIST_SUCCESS) {

    	var donelist = JSON.parse(action.doneList);
    	return Object.assign({}, state, {doneList: donelist})
    } 
    else if (action.type === actions.GET_NOTES_SUCCESS) {

    	var dailyNotes = JSON.parse(action.notes)
  	
    	return Object.assign({}, state, dailyNotes)

    } 	

    else {

		return state;
	}	
};

exports.scrumReducer = scrumReducer;