var React = require('react');
var router = require('react-router')

var Link = router.Link;


var Form = function(props){
	return (
		<form className={props.name} >
			<input className="username" placeholder="User Name" required />
			<input className="password" placeholder="Password" required />
			<Link to="home"><button className="submit-btn" type="submit">Enter</button></Link>
		</form>
	)	
};

module.exports = Form;