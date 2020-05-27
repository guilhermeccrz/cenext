import React from 'react';
import InputPhone from './';
import { shallow } from 'enzyme';

it('should render a label', () => {
  const wrapper = shallow(
      <InputPhone value="" />
  );
  expect(wrapper).toMatchSnapshot();
});