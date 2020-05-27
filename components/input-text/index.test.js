import React from 'react';
import InputText from './';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<InputText />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});