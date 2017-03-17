var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index')

var ProjectCard = require('./projectCard')


var Projects = React.createClass({

	componentDidMount: function(){

		var thiss = this;
		var userid = null;

		if (localStorage.userId) {				// Checks to see if the user is logged in
			var userid = {userid: localStorage.userId};	
		} else {
			alert('you are not logged in')
			hashHistory.push('/')
		}

		setTimeout(this.openEmpty.bind(null, thiss),500)  //After trying to retrieve projects, if this.props.projects === 0 the side menu will open, if not projects will show and side menu remain closed

		this.props.dispatch(actions.getProjects(userid))
		document.getElementById('hidenotes').style.display = 'none';
		var html = document.getElementsByTagName('html')[0].style.backgroundImage = 'none'; //Sets the background color to light grey	
	},

	openEmpty: function(thiss){		// Used to open side menu if projects === 0
		if (thiss.props.projects.length === 0){
			setTimeout(function(){
				document.getElementById('menuToggle').checked = true;
			},500)
		}
	},

	render: function(props){
			
			if (this.props.projects.length !== 0) {

				var projectsList = this.props.projects.map(function(object, index){
					return <ProjectCard Order={index} key={index} index={index} projectName={object.projectName} sprint={object.startDate} />
				})

			} else {
				
				var projectsList =  <h1 className='start-a-project'>Start A New Project</h1>;		
			
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