var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index')

var ProjectCard = require('./projectCard')


var Projects = React.createClass({

	componentDidMount: function(){

		this.props.dispatch(actions.resetState())

		var userid = null;
		 if (localStorage.userId) {
			var userid = {userid: localStorage.userId};
		} else {
			alert('you are not logged in')
			hashHistory.push('/')
		}

		this.props.dispatch(actions.getProjects(userid))
		document.getElementById('hidenotes').style.display = 'none'
	},

	render: function(props){
		
		if (this.props.projects.length !== 0) {

			var projectsList = this.props.projects.map(function(object, index){
				return <ProjectCard Order={index} key={index} index={index} projectName={object.projectName} sprint={object.startDate} />
			})

		} else {	

			var projectsList =  <h1 className='menu-header start-a-project'>Start A New Project</h1>;		
		}

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