var React = require('react');
var router = require('react-router');


var Link = router.Link;

var Call = function(props) {
    return (
        <div>  
	        <Link to="signin" ><button className="signIn">Sign In</button></Link>
	        <Link to="signup" ><button className="signUp">Sign Up</button></Link>     
            <div className='container-text row'>
            	<div className='icon col-12'>
            		<img className='icon-app' src='https://photos-6.dropbox.com/t/2/AABq-xRd0fxSXgOFG6lRGrv3UpnmO0S31WZpyl5SOk9bxA/12/645060565/png/32x32/1/_/1/2/icon-scrum1.png/EI3t2p4FGAkgAigC/UZZn0wtTfTZTexN81m_vTpNZeq8t5_Hwzk0tb0EUrY8?size=2048x1536&size_mode=3' />
            		<h1 className='app-name'>Scrum-mage</h1>
            	</div>
            	<div className='box col-12'>
            		<div className='wrapper'>
	            		<img className='image-intro col-6' src='https://photos-6.dropbox.com/t/2/AACpzUvkK6aBUyrl-wAvRR5Vp3AzQinmbWB9b2zKF8GY1A/12/645060565/jpeg/32x32/1/_/1/2/Scrumboard.jpg/EI3t2p4FGAQgAigC/1VVTDQwNDTteZDyhy1FMy5Y3Lr6Y4EyfqzabBnPs0Ws?size=2048x1536&size_mode=3' />
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
	            			<img className='image-phone' src='https://photos-4.dropbox.com/t/2/AADJD_dLDFSP4sxi9EiRgIGrwcWgfHGsX3ZDwcRHPdMbUA/12/645060565/png/32x32/1/_/1/2/mobilephone1.png/EI3t2p4FGAggAigC/_Xu6lB7zepKVGmlPyKDSprCk_XpaLsV7A_Eyeaz-Cyw?size=2048x1536&size_mode=3' />
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
    );
};

module.exports = Call;