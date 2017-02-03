var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index')

var ProjectCard = require('./projectCard')

var testArray = [
	{
		projectName: 'Project One',
		sprint: '80'
	},
		{
		projectName: 'Project Two',
		sprint: '50'
	},
		{
		projectName: 'Project Three',
		sprint: '20'
	}

];


var Projects = React.createClass({

	componentDidMount: function(){
		console.log('testing prjects mounting')
		this.props.dispatch(actions.resetState())
	},

	render: function(props){
		var projectsList = testArray.map(function(object, index){
			return <ProjectCard key={index} index={index} projectName={object.projectName} sprint={object.sprint} />
		})

		return (
			<div className="project-list-container row">
				{projectsList}
			</div>
		)
	}

});

var mapStateToProps = function(state, props){	

	return {
		entries: state.entries,
		taskList: state.taskList,
		devList: state.devList,
		testList: state.testList,
		releaseList: state.releaseList,
		doneList: state.doneList
	}
};

var Container = connect(mapStateToProps)(Projects);

module.exports = Container;