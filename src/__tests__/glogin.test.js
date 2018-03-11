import React from 'react';
import {GLogin} from '../components/glogin';
import {shallow} from 'enzyme';
import {GoogleLogin} from 'react-google-login';

describe ('GLogin component', () => {
  let wrapper;
  const mockSetLogin = jest.fn();
  const mockLogin = {loggedin: false, gg_token_id: 'hghghghg'}
  
  beforeEach(() => {
    wrapper = shallow(<GLogin login={mockLogin} setLogin={mockSetLogin} />);
  });

  it('should contain a google login button', () => {
    expect(wrapper.find(GoogleLogin)).toHaveLength(1);
  });

  it('should contain a link to create a new google account', () => {
    expect(wrapper.contains(<a href='https://accounts.google.com/SignUp?hl=en'>here</a>)).toEqual(true);
  });
  
});