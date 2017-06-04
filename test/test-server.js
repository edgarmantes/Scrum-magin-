// var config = require('../config')
// global.DATABASE_URL = config.DATABASE_URL;

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
// var storage = server.storage;

chai.use(chaiHttp);

// describe('Sign In Page', function() {
//     it('should sign in user on POST', function(done){
//         chai.request(app)
//             .post('/account')
//             .send({'username': 'testing', 
//                    'password':'123'
//                   })
//             .end(function(err, res){
//                 console.log(err)
//                 should.equal(err, null);
//                 res.should.have.status(201);
//                 done();
//             })        
//     })

// });



// describe('Shopping List', function() {
//     it('should list items on get');
//     it('should add an item on post');
//     it('should edit an item on put');
//     it('should delete an item on delete');
// });