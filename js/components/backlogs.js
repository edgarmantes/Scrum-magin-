var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var List = require('./list-item');


var BackLogs = React.createClass({

	addEntry: function(event){
		event.preventDefault();
		var entry = document.getElementsByClassName('backlog-entry')[0].value;
		console.log(entry)
		this.props.dispatch(actions.addEntry(entry));
		document.getElementsByClassName('entry')[0].reset;		
	},

	addToTaskList: function(entry){
		this.props.dispatch(actions.addToTaskList(entry));
	},

	deleteEntry: function(entry){
		this.props.dispatch(actions.deleteEntry(entry));

	},

	render: function(props){
	
		var entryArray = this.props.entries.map(function(entry, index){

			return <List key={index} entry={entry} onClick={this.deleteEntry.bind(null, entry)} onClickAdd={this.addToTaskList.bind(null, entry)} index={index} btnOne='&minus;' btnTwo='&oplus;' />
			
		}, this)

		return (

			<div className="container row"> 
		      <div className="header row border">
		        <h1 className="backlog-h1 col-6">Back Logs</h1>
		      </div>
		      <div className="log-container col-12 border">
		        <ul className="js-entries entries">
		        	{entryArray}
		        </ul>
		      </div>
		      <div className="submit col-12">
		        <form className="js-submit col-12">
		          <input className="backlog-entry entry col-12 input" placeholder="User stories" required />
		          <button className="button-submit greenback" onClick={this.addEntry} type="submit">Create New Story</button>
		        </form>  
		      </div>
		    </div>

		)
	}
})

var mapStateToProps = function(state, props){	

	return {
		entries : state.entries
	}
};

var Container = connect(mapStateToProps)(BackLogs);

module.exports = Container;