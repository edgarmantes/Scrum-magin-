var React = require('react');
var router = require('react-router');


var Link = router.Link;

var Call = function(props) {
    return (
        <div>
            <Link to="signin" ><button className="signIn">Sign In</button></Link>
            <Link to="signup" ><button className="signUp">Sign Up</button></Link>
        </div>
    );
};

module.exports = Call;