var React = require('react');
var router = require('react-router');


var Link = router.Link;

var Call = function(props) {
    return (
       <div>  
    
            <div className='container-text row'>
            	<div className='icon col-6 icon-cont'>
            		<img className='icon-app' src='../images/icon-scrum.png' />
            		<h1 className='app-name'>Scrum-mage</h1>
				    <div className="sign-control">
				        <Link to="signin" ><button className="signIn">Sign In</button></Link>
				        <Link to="signup" ><button className="signUp">Sign Up</button></Link>             		
            		</div>
            	</div>
            	<div className="call-desc-container col-6">
	            	<div className='box col-12'>
	            		<div className='wrapper'>
		            		<img className='image-intro col-6' src='../images/call-image.png'/>
			            	<div className='description col-6'>	
			            		<h3 className='call-board'>Organize your projects</h3>
			            		<p className='intro'>Keep organized and stay on track 
			            		using this Scrum based app. Let Scrum-mage
			            		help your app development go smoothly and without a 
			            		hitch. Scrum-mage is an intuitive app that will help increase 
			            		your productivity with any project, large or small.</p>
		            		</div>
		            	</div>
	            	</div>
	            	<div className='box col-12'>
	            		<div className='wrapper'>
		            		<div className='img-container col-6'>
		            			<img className='image-phone' src='../images/phone-ex.png' />
			            	</div>
			            	<div className='description col-6'>	
			            		<h3 className='call-board'>Continue at Home or Away</h3>
			            		<p className='intro'>Check your progress at home or on the go.
			            		Scrum-mage is accessible program and mobile responsive. It is designed with mobile first in mind.</p>
		            		</div>
		            	</div>
	            	</div>
	            </div>
            </div>
        </div>
    );
};

module.exports = Call;