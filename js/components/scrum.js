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

	addToTest: function(){

	},

	backDev: function(){

	},

	addToRelease: function(){

	},

	backTest: function(){

	},

	addToDone: function(){

	},


	render: function(props){

		var tasks = this.props.taskList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backLog.bind(null, entry)} onClickAdd={this.addToDev.bind(null, entry)} index={index} btnOne='back' btnTwo='next' />
		}, this)

		var dev = this.props.devList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backTask.bind(null, entry)} onClickAdd={this.addToTest.bind(null, entry)} index={index} btnOne='back' btnTwo='next' />		
		}, this)

		var test = this.props.testList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backDev.bind(null, entry)} onClickAdd={this.addToRelease.bind(null, entry)} index={index} btnOne='back' btnTwo='next' />		
		}, this)

		var release = this.props.releaseList.map(function(entry, index){
			return <List key={index} entry={entry} onClick={this.backTest.bind(null, entry)} onClickAdd={this.addToDone.bind(null, entry)} index={index} btnOne='back' btnTwo='next' />	
		}, this)

		return (
			<div className='scrum-container boards row'>
				<div className='scrum-tasks boards col-3'>
					<ul>
						{tasks}
					</ul>
				</div>
				<div className='scrum-dev boards col-3'>
					<ul>
						{dev}
					</ul>
				</div>
				<div className='scrum-test boards col-3'>
					<ul>	
						{test}
					</ul>
				</div>
				<div className='scrum-release boards col-3'>
					<div>	
						{release}
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

