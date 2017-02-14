var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index')

var ProjectCard = require('./projectCard')


var Projects = React.createClass({

	componentDidMount: function(){
		console.log('testing prjects mounting')
		this.props.dispatch(actions.resetState())
		
		var userid = {userid: this.props.userid}
		this.props.dispatch(actions.getProjects(userid))
	},

	render: function(props){

		var projectsList = this.props.projects.map(function(object, index){

			return <ProjectCard Order={index} key={index} index={index} projectName={object.projectName} sprint={object.startDate} />
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
		doneList: state.doneList,
		userid: state.userid,
		projects: state.projects
	}
};

var Container = connect(mapStateToProps)(Projects);

module.exports = Container;