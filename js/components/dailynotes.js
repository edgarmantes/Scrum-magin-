var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var DailyNotes = React.createClass({

	componentDidMount: function(){

		var buttons = document.getElementsByClassName('btns-board');
		buttons[0].className = "backlog btns-board";
		buttons[1].className = "scrum btns-board";
		buttons[2].className = "donepile btns-board";

		var createProjectId = null;


		// if (!this.props.dailyNotes) {
		// 	console.log(17, this.props.dailyNotes)
		// 	createProjectId = localStorage.getItem('createProjectId');			

		// 	createProjectId = localStorage.getItem('createProjectId')
		// 	this.props.dispatch(actions.loadThisProject(createProjectId))
		// 	this.props.dispatch(actions.getProjects({userid: localStorage.userId}))		
		// }  

		this.props.dispatch(actions.getNotes());

		


		document.getElementsByTagName('html')[0].style.backgroundImage = 'none';

	},

	submitNotes: function(e){
		e.preventDefault();

		var notes = document.getElementsByClassName('notes-entry')[0].value;

		this.props.dispatch(actions.addNotes(notes))
	},

	render: function(props){

		if (document.getElementById('notesEntered') !== null){

			document.getElementById('notesEntered').innerHTML = this.props.dailyNotes;
		}

		return (
			<div className='dailynotes row'>
				<div className='notesheader-container col-6'>
					<h1 className='notes'>Daily Notes</h1>
				</div>
				<div className='notes-container'>
			        
			        <textarea id='notesEntered' className='notes-entry' defaultValue={this.props.dailyNotes}  placeholder='Add Notes - '/>
			        <button id='submit-notes' className='button-submit col-12' onClick={this.submitNotes} ></button>
			    </div>
			</div>

		)
	}
})

var mapStateToProps = function(state, props){	

	return {
		dailyNotes: state.dailyNotes || []

	}
};

var Container = connect(mapStateToProps)(DailyNotes);

module.exports = Container;