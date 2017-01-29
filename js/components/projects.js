var React = require('react');
var connect = require('react-redux').connect;

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

module.exports = Projects;