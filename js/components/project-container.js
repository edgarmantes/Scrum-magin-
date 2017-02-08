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
		document.getElementById('members').reset();
	},

	render: function(props){
		return (
			<div className='createProject row'>
				<div className='createContainer col-12'>
					<form className="createProjectForm">
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
						<button className='create-btn' type="submit">Create Project</button><br/>
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
		doneList: state.doneList
	}
};

var Container = connect(mapStateToProps)(CreateProjectContainer);

module.exports = Container;
