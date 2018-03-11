import React from 'react';
import {Header} from '../components/header';
import { shallow } from 'enzyme';
import {NavDropdown, NavItem} from 'react-bootstrap';

describe ('Header component', () => {
  let wrapper;
  const mockSetLogin = jest.fn();
  const mockLogin = {loggedin: false, gg_token_id: 'hghghghg'}
  
  beforeEach(() => {
    wrapper = shallow(<Header login={mockLogin} setLogin={mockSetLogin} />);
  });

  it('should contain a header link', () => {
    expect(wrapper.contains(<a href='/'>Teachsomebody</a>)).toEqual(true);
  });

  it('should contain a single dropdown', () => {
    expect(wrapper.find(NavDropdown)).toHaveLength(1);
  });
  
  it('should contain two nav items', () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
});