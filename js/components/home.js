var React = require('react');
var router = require('react-router');
var connect = require('react-redux').connect;

var actions = require('../actions/index')

var Link = router.Link;

var Home = React.createClass({

	componentDidMount: function(){
		this.props.dispatch(actions.resetState());
	},

	closeMenu: function(e){
		e.stopPropagation();
		document.getElementById('menuToggle').checked = false;		
	},

	render: function(props){
		return (
			<div className="navigation">
				<input type="checkbox" id="menuToggle" />
				<label htmlFor="menuToggle" className="menu-icon">&#9776;</label>
				<header>
					<img className='home-icon' src='https://photos-3.dropbox.com/t/2/AACVDNd-SWOFEUIrSk-wW9Ad_9Gs4T10Wwl9KWjTCv_ZgQ/12/645060565/png/32x32/1/_/1/2/icon-scrum2.png/EI3t2p4FGAogAigC/OG-jsGYdhtmNRjES9jh5BndaOUOF4_NeCbnc7aDRg5k?size=1024x768&size_mode=3' />
				</header>
				<nav className="menu">
					<h4 className='menu-header'>Scrum-mage</h4>
					<Link to="home"><button className="project-list btn-home" onClick={this.closeMenu}>Projects</button></Link>
					<Link to="createproject"><button className="new-project btn-home" onClick={this.closeMenu}>Create Projects</button></Link>
					<Link id='hidenotes' to={"dailynotes/" + this.props.params.Order}><button className="daily-notes btn-home" onClick={this.closeMenu}>Daily Notes</button></Link>
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