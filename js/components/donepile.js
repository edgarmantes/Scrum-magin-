var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var DonePile = React.createClass({
	componentDidMount: function(){

		var buttons = document.getElementsByClassName('btns-board');
		buttons[0].className = "backlog btns-board";
		buttons[1].className = "scrum btns-board";
		buttons[2].className = "donepile btns-board tabbed";

		var createProjectId = null;
		if (this.props.entries !== null) {

			createProjectId = localStorage.getItem('createProjectId');			

			createProjectId = localStorage.getItem('createProjectId')
			this.props.dispatch(actions.loadThisProject(createProjectId))
			this.props.dispatch(actions.getProjects({userid: localStorage.userId}))
		
		}  

		this.props.dispatch(actions.loadThisDoneList(createProjectId))
		document.getElementsByTagName('html')[0].style.backgroundImage = 'none';
	},

	render: function(props){

		var doneArray = this.props.doneList.map(function(entry, index){

			return <li className='done-item' key={index}>{entry}</li>

		})

		return (
			
			<div className="container row"> 
				<div className="row border">
					<h1 className="done-pile-h1 col-6">Done Pile</h1>
				</div>
				<div className="log-container done col-12 border">
					<ul className="done-list">
						{doneArray}
					</ul>
				</div>
		    </div>
		)
	}

})

var mapStateToProps = function(state, props){	

	return {
		doneList : state.doneList || [],
		projects: state.projects || []
	}
};

var Container = connect(mapStateToProps)(DonePile);

module.exports = Container;