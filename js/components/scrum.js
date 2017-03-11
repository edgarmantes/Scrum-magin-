var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var List = require('./list-item');

var Scrum = React.createClass({

	componentWillMount: function(){

		var buttons = document.getElementsByClassName('btns-board');
		buttons[0].className = "backlog btns-board";
		buttons[1].className = "scrum btns-board tabbed";
		buttons[2].className = "donepile btns-board";

		var createProjectId = this.props.projects[this.props.params.Order]._id;

		this.props.dispatch(actions.loadThisBoard(createProjectId))

	},

	backLog: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'entries',
			from: 'taskList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backLog))

	},

	addToDev: function(entry){

		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'devList',
			from: 'taskList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToDev))	
		// this.props.dispatch(actions.addToDev(entry))
	},

	backTask: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'taskList',
			from: 'devList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backTask))
		// this.props.dispatch(actions.backTask(entry))
	},

	addToTest: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'testList',
			from: 'devList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToTest))
		// this.props.dispatch(actions.addToTest(entry))
	},

	backDev: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'devList',
			from: 'testList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backDev))
		// this.props.dispatch(actions.backDev(entry))
	},

	addToRelease: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'releaseList',
			from: 'testList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToRelease))
		// this.props.dispatch(actions.addToRelease(entry))
	},

	backTest: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'testList',
			from: 'releaseList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.backTest))
		// this. props.dispatch(actions.backTest(entry))
	},

	addToDone: function(entry){
		var creds = {
			object : entry,
			endpoint : '/move',
			to : 'doneList',
			from: 'releaseList',
			projectName : this.props.projects[this.props.params.Order].projectName
		};	
		this.props.dispatch(actions.move(creds, actions.addToDone))
		// this.props.dispatch(actions.addToDone(entry))
	},


	render: function(props){

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
						<h2 className='column'>Tasks</h2>
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
		entries: state.entries,
		taskList: state.taskList,
		devList:  state.devList,
		testList: state.testList,
		releaseList: state.releaseList,
		projects: state.projects
	}
};

var Container = connect(mapStateToProps)(Scrum);

module.exports = Container;

