var React = require('react');
var router = require('react-router');


var Link = router.Link;

var Call = React.createClass({

	componentDidMount: function(){
		document.getElementsByTagName('html')[0].style.backgroundImage = 'url(../images/wallpaper.png)';	//load background image
	},

	render: function(props) {
	    return (
	       <div>    
	            <div className='container-text row'>
	            	<div className='icon col-6 icon-cont'>
        				<div className='description col-6'>	
		            		<p className='intro'>Srum-mage helps to keep projects organized and stay on track. Sign up and get going on your projects.</p>
	            		</div>
	            	</div>
	            	<div className="call-desc-container col-6">
		            	<div className='box col-12'>
		            		<div className='wrapper'>
			            		<img className='icon-app' src='../images/scrum-iphone.png' />
							    <div className="sign-control">
							        <Link to="signin" ><button className="signIn">Sign In</button></Link>
							        <Link to="signup" ><button className="signUp">Sign Up</button></Link>             		
			            		</div>
			            	</div>
		            	</div>
		            	<div className='box  bottom-desc col-12'>
		            		<div className='wrapper'>
				            	<div className='description col-6'>	
				            		<img className="home-away-img" src='../images/homeaway.png' />
				            		<h3 className='call-board'>Continue at Home or Away</h3>
				            		<p className='intro call-away-desc'>Check your progress at home or on the go.
				            		Scrum-mage is accessible program and mobile responsive. It is designed with mobile first in mind.</p>
			            		</div>
			            	</div>
		            	</div>
		            </div>
	            </div>
	        </div>
	    );
	}

});

module.exports = Call;