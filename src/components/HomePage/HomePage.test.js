import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<HomePage />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should match snapshot', () => {
    expect(component.length).toMatchSnapshot();
  });
});
