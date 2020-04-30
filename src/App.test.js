import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  it('It should mount', () => {
    expect(component.length).toMatchSnapshot();
  });
});

