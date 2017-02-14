var React = require('react');
var router = require('react-router');

var Link = router.Link;

var Scrumboard = function(props){

	return (
		<div className='scrumboard'>
			<Link to={'scrumboard/' + props.params.Order} ><button className='backlog btns-board'>Back Log</button></Link>
			<Link to={'scrum/' + props.params.Order} ><button className='scrum btns-board'>Scrum</button></Link>
			<Link to={'donepile/' + props.params.Order} ><button className='donepile btns-board'>Done Pile</button></Link>
			<div className='scrumchart'>
				{props.children}
			</div>
		</div>
	)
};

module.exports = Scrumboard;