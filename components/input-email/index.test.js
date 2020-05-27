import React from 'react';
import InputEmail from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<InputEmail />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});