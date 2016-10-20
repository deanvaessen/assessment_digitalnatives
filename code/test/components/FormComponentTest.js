/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
import React from "react";
//const TestUtils = React.addons.TestUtils;
import TestUtils from "react-addons-test-utils";
import createComponent from 'helpers/shallowRenderHelper';

import Form from 'components/FormComponent/FormComponent';

describe('FormComponent', () => {
	let FormComponent;

	beforeEach(() => {
		FormComponent = createComponent(Form);
		renderer = TestUtils.createRenderer();

		renderer.render(

		);

		formcomponent = renderer.getRenderOutput();
	});

	it('test', () => {
		console.log(formcomponent)
		//expect(FormComponent.props.className).to.equal('index');
	});
});
