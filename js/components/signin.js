var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');


var Form = require('./form');

var SignIn = React.createClass({

	signIn: function(){
		console.log('submit test')
		var user = {
			username: document.getElementById('username-signin').value,
			password: document.getElementById('password-signin').value
		}

		this.props.dispatch(actions.fetchUser(user))
	},

	render: function(props){

		return (
			<div className='signin-container row'>
				<div className="signin col-6">
					<h1 className='signin-h1'>Sign In</h1>
					<form>
						<fieldset>
							<input id='username-signin' type='text' placeholder='User Name' required/>
							<input id='password-signin' type='password' placeholder='*********' required/>
							<input className='input-signin' type='submit' value='Sign In' onClick={this.signIn}  />
						</fieldset>
					</form>
				</div>
			</div>
		)
	}
})

var Container = connect()(SignIn);

module.exports = Container;