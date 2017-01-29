How it is setup initially

Front-End:
	This is a React.js framework that uses Redux to handle the application state and Redux Thunk for Asynchronous operations. React is used to handle routing methods on the front end. React can make AJAX calls to the server.js file. This is set up to use Isomorphic Fetch for asynchronous operations.
	Testing front-end uses Chai-Enzyme...

Back-End:
	Express.js is used for the server side language. It serves the 'public' static files and listens to RESTful API requests with CRUD operations. It also communicates with a MongoDB Mongoose Database (initiate setup for Mongoose is required). 
	Passport.js is used for Authentication when login in. 

MongoDB/Mongoose:
	Is used to communicate with the server. Initial setup is required as per MongoDB setup. 
	Config.js file has been setup for local dev environment DB and just needs a URL from MongoDB.com to connect to during deployment. 

TravisCI/DI:
	Assuming that 

