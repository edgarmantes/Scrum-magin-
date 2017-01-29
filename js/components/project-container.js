var React = require("react");

var actions = require("../actions/index");

var CreateProjectContainer = React.createClass({


	render: function(props){
		return (
			<div className='createProject row'>
				<div className='createContainer col-12'>
					<form className="createProjectForm">
						<label>Project Name:</label><br/>
						<input type="text" className="project-name" /><br/>	
						<label>Start Date:</label><br/>
						<input type="text" className="start-date" /><br/>
						<label>End Date:</label><br/>
						<input type="text" className="end-date" /><br/>
						<label>Project Leader:</label><br/>
						<input type="text" className="project-leader" /><br/>
						<label>Scrum Master:</label><br/>
						<input type="text" className="scrum-master" /><br/>
						<label>Add Member:</label><br/>
						<input type="text" className="add-members" /><br/>
						<label>Team Members:</label><br/>	
						<div className='listedMembers'>
							<ul className='members'></ul>
						</div>
						<button type="submit">Create Project</button><br/>
					</form>	
				</div>
			</div>	
		)
	}

})

module.exports = CreateProjectContainer;