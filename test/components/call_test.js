import { renderComponent, expect } from '../test_helper';
import Call from '../../js/components/call';

describe('Call', () => {

	const component = renderComponent(Call)	

	it('has Sign In button', () => {
		
		expect(component.find('.signIn')).to.exist;
		expect(component.find('.container-text')).to.have.descendants('a').to.have.descendants('button');
	
	})

	it('has Sign Up button', () => {
		
		expect(component.find('.signUp')).to.exist;
		expect(component.find('.container-text')).to.have.descendants('a').to.have.descendants('button');

	})

})

