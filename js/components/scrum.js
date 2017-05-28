var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var List = require('./list-item');

var Scrum = React.createClass({

	componentDidMount: function(){

		var buttons = document.getElementsByClassName('btns-board');
		buttons[0].className = "backlog btns-board";		// Highlights the tabs
		buttons[1].className = "scrum btns-board tabbed";	// Highlights the tabs
		buttons[2].className = "donepile btns-board";		// Highlights the tabs

		var createProjectId = null;				//Load the current project to load on refresh
		if (this.props.entries !== null) {

			createProjectId = localStorage.getItem('createProjectId');			

			createProjectId = localStorage.getItem('createProjectId')
			this.props.dispatch(actions.loadThisProject(createProjectId))
			this.props.dispatch(actions.getProjects({userid: localStorage.userId}))

		}  

		this.props.dispatch(actions.loadThisBoard(createProjectId))
		document.getElementsByTagName('html')[0].style.backgroundImage = 'none';
	},

	backLog: function(entry){	// Moves entry back to Backlogs
		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'entries',
			from: 'taskList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backLog))

	},

	addToDev: function(entry){	// Move entry forward to Dev List

		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'devList',
			from: 'taskList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToDev))	

	},

	backTask: function(entry){	// Moves entry back to Tasklist
		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'taskList',
			from: 'devList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backTask))

	},

	addToTest: function(entry){		// Move entry forward to Test List
		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'testList',
			from: 'devList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToTest))

	},

	backDev: function(entry){	// Moves entry back to Dev List
		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'devList',
			from: 'testList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backDev))

	},

	addToRelease: function(entry){	// Move entry forward to Release List
		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'releaseList',
			from: 'testList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToRelease))

	},

	backTest: function(entry){	// Moves entry back to Test List
		var creds = {		
			object : entry,
			endpoint : '/object',
			to : 'testList',
			from: 'releaseList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backTest))

	},

	addToDone: function(entry){		// Move entry forward to Done List
		var creds = {
			object : entry,
			endpoint : '/object',
			to : 'doneList',
			from: 'releaseList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToDone))

	},


	render: function(props){

		var projectName = this.props.projectName;

		var tasks = this.props.taskList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backLog.bind(null, entry)} onClickAdd={this.addToDev.bind(null, entry)} index={index} moveBack="moveBack" moveForward="moveForward" />
		}, this)

		var dev = this.props.devList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backTask.bind(null, entry)} onClickAdd={this.addToTest.bind(null, entry)} index={index} moveBack="moveBack" moveForward="moveForward" />		
		}, this)

		var test = this.props.testList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backDev.bind(null, entry)} onClickAdd={this.addToRelease.bind(null, entry)} index={index} moveBack="moveBack" moveForward="moveForward" />		
		}, this)

		var release = this.props.releaseList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backTest.bind(null, entry)} onClickAdd={this.addToDone.bind(null, entry)} index={index} moveBack="moveBack" moveForward="moveForward" />	
		}, this)



		return (
			<div className='scrum-container row'>
				<div className='col-3'>
					<div className='scrum-tasks boards'>
						<h2 className='column'>Tasks - <span className="projectName">({projectName})</span></h2>
						<ul>
							{tasks}
						</ul>
					</div>
				</div>
				<div className='col-3'>
					<div className='scrum-dev boards'>
						<h2 className='column'>Dev</h2>
						<ul>
							{dev}
						</ul>
					</div>
				</div>
				<div className='col-3'>
					<div className='scrum-test boards'>
						<h2 className='column'>Test</h2>
						<ul>	
							{test}
						</ul>
					</div>
				</div>
				<div className='col-3'>
					<div className='scrum-release boards'>
						<h2 className='column'>Release</h2>
						<ul>	
							{release}
						</ul>	
					</div>
				</div>
			</div>
		)
	}
})


var mapStateToProps = function(state, props){	

	return {
		entries: state.entries || [],
		taskList: state.taskList || [],
		devList:  state.devList || [],
		testList: state.testList || [],
		releaseList: state.releaseList || [],
		projects: state.projects || [],
		projectName: state.projectName
	}
};

var Container = connect(mapStateToProps)(Scrum);

module.exports = Container;

