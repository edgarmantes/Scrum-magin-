var React = require('react');
var connect = require('react-redux').connect;

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;

var actions = require('../actions/index');

var List = require('./list-item');


var BackLogs = React.createClass({

	componentDidMount: function(){

		var buttons = document.getElementsByClassName('btns-board');
		buttons[0].className = "backlog btns-board tabbed";		// Highlights the "backlog" tab
		buttons[1].className = "scrum btns-board";				// clears tab highlight
		buttons[2].className = "donepile btns-board";			// clears tab highlight

		var createProjectId = null;		// Project Id

		if (this.props.entries !== null && this.props.params.Order) {		// 

			createProjectId = this.props.projects[this.props.params.Order]._id;			
			localStorage.setItem('createProjectId', createProjectId);

		}  else {
			
			createProjectId = localStorage.getItem('createProjectId') 	// On page refresh createProjectId is references from local storage

		}
																									/*page refresh*/
		this.props.dispatch(actions.getProjects({userid: localStorage.userId}))		// retrieves user's list of projects referencing localStorage 
		this.props.dispatch(actions.loadThisProject(createProjectId))				// loads user's project referencing localStorage
		this.props.dispatch(actions.getNotes());									// loads user's notes on this project
		document.getElementById('hidenotes').style.display = 'block'				// When you enter a project the "Daily Notes tab is unhidden"
		document.getElementsByTagName('html')[0].style.backgroundImage = 'none';	// Removes background image
	},

	addEntry: function(event){		// Adds a new entry to back-logs
		event.preventDefault();
		var entry = document.getElementsByClassName('backlog-entry')[0].value;	

			var creds = {
				object : entry,
				endpoint : '/move',
				to : 'entries',
				from: null,
				projectName : this.props.projects[this.props.params.Order].projectName
			};

			document.getElementsByClassName('backlog-entry')[0].value = '';	
			this.props.dispatch(actions.move(creds, actions.addEntry))		// Makes async call to add in db and update redux store
	},

	addToTaskList: function(entry){		

		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'taskList',
			from: 'entries',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToTaskList))		// Makes async call to add in db and update redux store
	},

	deleteEntry: function(entry){

		var creds = {
			object : entry,
			endpoint : '/move',
			to : null,
			from: 'entries',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.deleteEntry))		// Makes async call to add in db and update redux store

	},

	render: function(props){

		var entryArray = null;
			if(!this.props.entries){	// If there is no projects this message will show

				entryArray = "Restart from 'Projects' list"

			} else {
				var entryArray = this.props.entries.map(function(entry, index){		// Will load all projects
					return <List key={index} entry={entry} onClick={this.deleteEntry.bind(null, entry)} onClickAdd={this.addToTaskList.bind(null, entry)} index={index} moveBack="remove" moveForward="AddTask" />			
				}, this)

			}

		return (

			<div className="container row"> 
		      <div className="header row border">
		        <h1 className="backlog-h1 col-6">Back Logs</h1>
		      </div>
		      <div className="log-container col-12 border">
		        <ul className="js-entries entries">
		        	{entryArray}
		        </ul>
		      </div>
		      <div className="submit col-12">
		        <form className="js-submit submit-form col-12">
					<input className="backlog-entry col-12 input" placeholder="User stories" required="required" />
					<button className="button-submit greenback" onClick={this.addEntry} type="submit"></button>
		        </form>  
		      </div>
		    </div>

		)
	}
})

var mapStateToProps = function(state, props){	

	return {
		entries : state.entries,
		projects: state.projects, 
		userid: state.userid
	}
};

var Container = connect(mapStateToProps)(BackLogs);

module.exports = Container;