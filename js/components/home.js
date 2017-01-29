var React = require('react');
var router = require('react-router');


var Link = router.Link;

var Home = function(props){
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
			<div>
				{props.children}
			</div>
		</div>
	)
};

module.exports = Home;