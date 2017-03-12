var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');


var Form = require('./form');

var SignUp = React.createClass({

	componentDidMount: function(){
		document.getElementsByTagName('html')[0].style.backgroundImage = 'url(../images/desktop.png)';	
	},

	createUser: function(e){
		e.preventDefault();
		console.log('submit test')
		var user = {
			username: document.getElementById('username-signup').value,
			password: document.getElementById('password-signup').value
		}

		this.props.dispatch(actions.fetchUser(user))
	},

	demo: function(e){
		e.preventDefault();
		console.log('submit test')
		var user = {
			username: 'demo',
			password: '123'
		}

		this.props.dispatch(actions.getUser(user))		
	},

	render: function(props){

		return (
			<div className='signup-container row'>
				<div className="signup col-6">
					<h1 className='signup-h1'>Sign Up</h1>
					<form >
						<fieldset>
							<input id='username-signup' type='text' placeholder='User Name' required/>
							<input id='password-signup' type='password' placeholder='*********' required/>
							<input className='input-signup' type='submit' value='Sign Up' onClick={this.createUser}  />
							<a href="/Demo" onClick={this.demo}><p className="demo-btn">Demo</p></a>						
						</fieldset>
					</form>
				</div>
			</div>
		)
	}
})

var Container = connect()(SignUp);

module.exports = Container;

