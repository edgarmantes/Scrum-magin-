require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;


var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

var store = require('./store');
var Call = require('./components/call');
var SignIn = require('./components/signin');
var SignUp = require('./components/signup');
var Home = require('./components/home');
var Projects = require('./components/projects');
var ProjectContainer = require('./components/project-container');
var Scrumboard = require('./components/scrumboard');
var BackLogs = require('./components/backlogs');
var Scrum = require('./components/scrum');
var DonePile = require('./components/donepile');


var routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={Call} />
				<Route path='signin' component={SignIn} />
				<Route path='signup' component={SignUp} />
				<Route path='home' component={Home}>
					<IndexRoute component={Projects} />
					<Route path='/createproject' component={ProjectContainer} />
				</Route>	 
				<Route path='scrumboard/:Order' component={Home}> 
					<Route component={Scrumboard}>
						<IndexRoute component={BackLogs} />
						<Route path='/scrum/:Order' component={Scrum} />
						<Route path='/donepile/:Order' component={DonePile} />
					</Route>
				</Route>
				
		</Router>
	</Provider>
)

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
		routes, 
    	document.getElementById('app'));
});