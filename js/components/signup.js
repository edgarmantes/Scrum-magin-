var React = require('react');

var Form = require('./form');

var SignUp = function(props){

	return (
		<div className="signin">
			<h1>Sign Up</h1>
			<Form name="signup" />
		</div>
	)
};


module.exports = SignUp;