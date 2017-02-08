var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var List = require('./list-item');

var Scrum = React.createClass({

	backLog: function(entry){

		this.props.dispatch(actions.backLog(entry))
	},

	addToDev: function(entry){

		this.props.dispatch(actions.addToDev(entry))
	},

	backTask: function(entry){

		this.props.dispatch(actions.backTask(entry))
	},

	addToTest: function(entry){

		this.props.dispatch(actions.addToTest(entry))
	},

	backDev: function(entry){

		this.props.dispatch(actions.backDev(entry))
	},

	addToRelease: function(entry){

		this.props.dispatch(actions.addToRelease(entry))
	},

	backTest: function(entry){

		this. props.dispatch(actions.backTest(entry))
	},

	addToDone: function(entry){
		console.log('test dispatch')
		this.props.dispatch(actions.addToDone(entry))
	},


	render: function(props){

		var tasks = this.props.taskList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backLog.bind(null, entry)} onClickAdd={this.addToDev.bind(null, entry)} index={index} btnOne='&larr;' btnTwo='&rarr;' />
		}, this)

		var dev = this.props.devList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backTask.bind(null, entry)} onClickAdd={this.addToTest.bind(null, entry)} index={index} btnOne='&larr;' btnTwo='&rarr;' />		
		}, this)

		var test = this.props.testList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backDev.bind(null, entry)} onClickAdd={this.addToRelease.bind(null, entry)} index={index} btnOne='&larr;' btnTwo='&rarr;' />		
		}, this)

		var release = this.props.releaseList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backTest.bind(null, entry)} onClickAdd={this.addToDone.bind(null, entry)} index={index} btnOne='&larr;' btnTwo='&rarr;' />	
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
		releaseList: state.releaseList
	}
};

var Container = connect(mapStateToProps)(Scrum);

module.exports = Container;

