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

		var createProjectId = null;
		localStorage.setItem('Order', this.props.params.Order)
		if (this.props.entries !== null) {
			createProjectId = this.props.projects[this.props.params.Order]._id;			
			localStorage.setItem('createProjectId', createProjectId);

		}  else {
			alert('reloading causes you to go back to your list of projects!')
			hashHistory.push('/home')
		}

		this.props.dispatch(actions.loadThisProject(createProjectId))
		this.props.dispatch(actions.getNotes());
		document.getElementById('hidenotes').style.display = 'block'
	},

	addEntry: function(event){
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
		this.props.dispatch(actions.move(creds, actions.addEntry))
	
	},

	addToTaskList: function(entry){

		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'taskList',
			from: 'entries',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToTaskList))		
	},

	deleteEntry: function(entry){

		var creds = {
			object : entry,
			endpoint : '/move',
			to : null,
			from: 'entries',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.deleteEntry))

	},

	render: function(props){

		var entryArray = null;
			if(!this.props.entries){
				entryArray = "Restart from 'Projects' list"
			} else {
				var entryArray = this.props.entries.map(function(entry, index){
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
		        <form className="js-submit col-12">
		          <input className="backlog-entry entry col-12 input" placeholder="User stories" required />
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