var React = require("react");
var connect = require('react-redux').connect;

var actions = require("../actions/index");

var CreateProjectContainer = React.createClass({

	addMember: function(e){
		e.preventDefault();
		var member = document.getElementsByClassName('add-members')[0].value
		this.props.dispatch(actions.addMember(member))
		var element = document.createElement('LI');
		element.setAttribute('class', 'crewPerson')
		element.textContent = member
		document.getElementById('members').appendChild(element);
	},

	createProject: function(e){
		console.log(20, 'test createProject')
		e.preventDefault();
		var info = {
			projectName: document.getElementsByClassName('project-name')[0].value,
			startDate: document.getElementsByClassName('start-date')[0].value,
			endDate: document.getElementsByClassName('end-date')[0].value,
			projectLeader: document.getElementsByClassName('project-leader')[0].value,
			scrumMaster: document.getElementsByClassName('scrum-master')[0].value,
			crew: this.props.crew,
			userid: localStorage.userId
		};

		this.props.dispatch(actions.createProject(info));
	},

	render: function(props){
		return (
			<div className='createProject row'>
				<div className='createContainer col-12'>
					<form className="createProjectForm">
						<fieldset>
							<label>Project Name:</label><br/>
							<input type="text" className="project-name create-input" placeholder='"best app ever!"' /><br/>	
							<label>Start Date:</label><br/>
							<input type="text" className="start-date create-input" placeholder='01/01/17' /><br/>
							<label>End Date:</label><br/>
							<input type="text" className="end-date create-input" placeholder='01/01/17' /><br/>
							<label>Project Leader:</label><br/>
							<input type="text" className="project-leader create-input" placeholder='"Big Boss"' /><br/>
							<label>Scrum Master:</label><br/>
							<input type="text" className="scrum-master create-input" placeholder='"me"' /><br/>
							<label>Add Member:</label><br/>

							<input type="text" className="add-members create-input" placeholder='Steve' /><button className='add' onClick={this.addMember}>ADD</button><br/>

							<label>Team Members:</label><br/>	
							<div className='listedMembers'>
								<ul id='members'>
									<li className='crewPerson'>Steve</li>
								</ul>
							</div>
							<button className='create-btn' type="submit" onClick={this.createProject}>Create Project</button><br/>
						</fieldset>
					</form>	
				</div>
			</div>	
		)
	}

})

var mapStateToProps = function(state, props){	

	return {
		entries: state.entries,
		taskList: state.taskList,
		devList: state.devList,
		testList: state.testList,
		releaseList: state.releaseList,
		doneList: state.doneList,

		crew: state.crew,
		userid: state.userid
	}
};

var Container = connect(mapStateToProps)(CreateProjectContainer);

module.exports = Container;
