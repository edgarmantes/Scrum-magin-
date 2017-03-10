var React = require('react');
var router = require('react-router');

var Link = router.Link;


var ProjectCard = function(props){
	return (
		<div className='projectCard col-12'>
			<Link to={'scrumboard/' + props.Order}><div className='container' onClick={props.onclick} >
				<div className='project-name'>Project Name: {props.projectName}</div>
				<div className='progressBar'>Sprint: {props.sprint}</div>
			</div></Link>
		</div>
	)
};

module.exports = ProjectCard;