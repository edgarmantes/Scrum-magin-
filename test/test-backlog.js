var React = require('react');
var TestUtils = require('react-addons-test-utils');
var should = require('chai').should();

var BackLog = require('../js/components/backlogs');

describe('BackLog', function() {
    it('Renders the BackLog component',  function() {
        var url = "http://localhost:8080/#/scrumboard/0";
        var entryArray = "<li class='listItem'><div class='entry'>does it work?</div><div class='btn-container'><input type='submit' class='entry-btn' value='−''><input type='submit' class='entry-btn' value='⊕'></div></li>";

        var renderer = TestUtils.createRenderer();
        renderer.render(<BackLog />);
        var result = renderer.getRenderOutput();
        result.props.className.should.equal('container row');

    });
});