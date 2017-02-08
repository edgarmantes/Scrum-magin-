var config = require('./config')
global.DATABASE_URL = config.DATABASE_URL;

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var User = require('../models/user');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            User.create(
                {
                    username: 'edgar',
                    password: '1234',
                    projects: []

                },
            

                function() {
                    done();
                }
            );
        });
    });

    after(function(done) {
        User.remove(function() {
            done();
        });
    });
});