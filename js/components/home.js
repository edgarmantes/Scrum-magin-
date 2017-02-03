var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;

var actions = require('../actions/index')

var Link = router.Link;

var Home = React.createClass({

	componentDidMount: function(){
		this.props.dispatch(actions.resetState());
	},

	render: function(props){
		return (
			<div className="navigation">
				<input type="checkbox" id="menuToggle" />
				<label htmlFor="menuToggle" className="menu-icon">&#9776;</label>
				<header>
					<h1>Header</h1>
				</header>
				<nav className="menu">
					<h4>Scrum-mage</h4>
					<Link to="home"><button className="project-list">Projects</button></Link>
					<Link to="createproject"><button className="new-project">Create Projects</button></Link>
					<Link to="dailynotes"><button className="daily-notes">Daily Notes</button></Link>
				</nav>
				<div className='home-container'>
					{this.props.children}
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

var Container = connect(mapStateToProps)(Home);

module.exports = Container;