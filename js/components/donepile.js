var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');

var DonePile = React.createClass({
	componentWillMount: function(){
		var createProjectId = this.props.projects[this.props.params.Order]._id;
		console.log(12, createProjectId)
		this.props.dispatch(actions.loadThisDoneList(createProjectId))
		// this.props.dispatch(actions.loadThisProject(createProjectId))
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
				<div className="log-container col-12 border">
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
		doneList : state.doneList,
		projects: state.projects
	}
};

var Container = connect(mapStateToProps)(DonePile);

module.exports = Container;