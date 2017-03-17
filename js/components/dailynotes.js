var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var DailyNotes = React.createClass({

	componentDidMount: function(){

		var buttons = document.getElementsByClassName('btns-board');
		buttons[0].className = "backlog btns-board";					// Highlights the "backlog" tab
		buttons[1].className = "scrum btns-board";						// clears tab highlight
		buttons[2].className = "donepile btns-board";					// clears tab highlight

		var createProjectId = null;

		this.props.dispatch(actions.getNotes());	// Loads the notes to the page

		document.getElementsByTagName('html')[0].style.backgroundImage = 'none';	// removes the image

	},

	submitNotes: function(e){
		e.preventDefault();

		var notes = document.getElementsByClassName('notes-entry')[0].value;	

		this.props.dispatch(actions.addNotes(notes))		// Saves the notes on click
	},

	render: function(props){

		if (document.getElementById('notesEntered') !== null){

			document.getElementById('notesEntered').innerHTML = this.props.dailyNotes; // Adds the text to the textarea
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