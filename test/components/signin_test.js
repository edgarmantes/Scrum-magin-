import { renderComponent, expect } from '../test_helper';
import React from 'react';  				// line 16 to render, this is needed
import { SignIn } from '../../js/components/signin'

import ShallowRenderer from 'react-test-renderer/shallow';

var renderer = new ShallowRenderer();

describe('Sign In', () => {

	let component;
	
	renderer.render(<SignIn />);
	component = renderer.getRenderOutput();

	it('has a class name of singin-container', () => {

		expect(component.type).equal('div');
		expect(component.props.className).to.include('signin-container');
	
	})

	it('has a form and fieldset tag', () => {
		
		expect(component).to.exist;
		expect(component.props.children.props.children[1]).to.exist;
		expect(component.props.children.props.children[1].props.children).to.exist;
		expect(component.props.children.props.children[1].props.children.type).to.equal('fieldset');
	})

	it('has a username input', () => {

		// console.log(component.props.children.props.children[1].props.children.props.children[0])
		expect(component.props.children.props.children[1].props.children.props.children[0]).to.exist;
		expect(component.props.children.props.children[1].props.children.props.children[0].type).to.equal('input');

		describe('entering some text', () => {
			beforeEach( () => {
				// component.simulate('change', 'UserName')
			})

			it('Enters text into username input field', () => {

				console.log(component.props.children.props.children[1].props.children.props.children[0])
				// expect(component.props.children.props.children[1].props.children.props.children[0]).to.have.value('UserName')
			})
			// it('Submit text from username input field', () => {})
			
		})
	})
	// it('has a password input', () => {})
	// it('has a submit button', () => {})
	// it('has a demo link', () => {})

})