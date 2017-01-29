var React = require('react');
var router = require('react-router');

var Link = router.Link;

var Scrumboard = function(props){
	return (
		<div className='scrumboard'>
			<Link to='scrumboard'><button className='backlog'>Back Log</button></Link>
			<Link to='scrum'><button className='scrum'>Scrum</button></Link>
			<Link to='donepile'><button className='donepile'>Done Pile</button></Link>
			<div className='scrumchart'>
				{props.children}
			</div>
		</div>
	)
};

module.exports = Scrumboard;