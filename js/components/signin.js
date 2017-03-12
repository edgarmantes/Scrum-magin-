var React = require('react');
var connect = require('react-redux').connect;

var actions = require('../actions/index');


var Form = require('./form');

var SignIn = React.createClass({

	componentDidMount: function(){
		document.getElementsByTagName('html')[0].style.backgroundImage = 'url(../images/desktop.png)';	
	},

	signIn: function(e){
		e.preventDefault();
		var user = {
			username: document.getElementById('username-signin').value,
			password: document.getElementById('password-signin').value
		}

		this.props.dispatch(actions.getUser(user))
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
			<div className='signin-container row'>
				<div className="signin col-6">
					<h1 className='signin-h1'>Sign In</h1>
					<form>
						<fieldset>
							<input id='username-signin' type='text' placeholder='User Name' required/>
							<input id='password-signin' type='password' placeholder='*********' required/>
							<input className='input-signin' type='submit' value='Sign In' onClick={this.signIn}  />
							<a href="/Demo" onClick={this.demo}><p className="demo-btn">Demo</p></a>
						</fieldset>
					</form>
				</div>
			</div>
		)
	}
})

var Container = connect()(SignIn);

module.exports = Container;