var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var DailyNotes = React.createClass({

	componentDidMount: function(){
		this.props.dispatch(actions.getNotes());

	},

	submitNotes: function(e){
		e.preventDefault();

		var notes = document.getElementsByClassName('notes-entry')[0].value;

		this.props.dispatch(actions.addNotes(notes))
	},

	render: function(props){

		if (document.getElementById('notesEntered') !== null){
			console.log(24, 'testing innerHTML')
			document.getElementById('notesEntered').innerHTML = this.props.dailyNotes;
		}
		console.log(23, document.getElementById('notesEntered'))
		return (
			<div className='dailynotes'>
				<div className='notesheader-container'>
					<h1 className='notes'>Daily Notes</h1>
				</div>
				<div className='notes-container'>
			        
			        <textarea id='notesEntered' className='notes-entry' defaultValue={this.props.dailyNotes}  placeholder='Add Notes - '/>
			        <button id='submit-notes' onClick={this.submitNotes} >Save</button>
			    </div>
			</div>

		)
	}
})

var mapStateToProps = function(state, props){	

	return {
		dailyNotes: state.dailyNotes

	}
};

var Container = connect(mapStateToProps)(DailyNotes);

module.exports = Container;