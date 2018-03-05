import React from "react";
import {withRouter} from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown, 
  MenuItem, Button, Modal
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLogin} from '../actions/index';
import {GoogleLogout} from 'react-google-login';

import '../styles/header.css';

class Header extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      active_menu: 1,
      show_req_creator_modal: false
    };
  }

  handleDropdownSelect = () => {
    this.setState({
      active_menu: 4
    });
  }

  handleReqModalOpen = () => {
    this.setState({
      show_req_creator_modal: true
    });
  }

  handleReqModalClose = () => {
    this.setState({
      show_req_creator_modal: false
    });
  }
  
  handleLogout = () => {
    this.props.setLogin(false);
    this.props.history.push('/');
  }

  render() {
    let loginprofile_button = <NavItem eventKey={2} className='header-login' href='/login'>Login</NavItem>; 
    let dropdown = <NavDropdown className='header-dropdown' eventKey={4} title="More" id="basic-nav-dropdown" onSelect={this.handleDropdownClick}>
                    <MenuItem eventKey={4.1} onClick={() => this.props.history.push('/login')}>Become a Creator</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.2}>Help</MenuItem>
                  </NavDropdown>;
    if (this.props.login.loggedin){
      loginprofile_button = <NavDropdown className='header-dropdown login-profile' title='' eventKey={4} id="basic-nav-dropdown">
                              <MenuItem eventKey={4.1} onClick={this.handleLogout}>
                                Logout
                              </MenuItem>
                            </NavDropdown>;
      dropdown = <NavDropdown className='header-dropdown' eventKey={4} title="More" id="basic-nav-dropdown" onSelect={this.handleDropdownClick}>
                    <MenuItem eventKey={4.1} onClick={this.handleReqModalOpen}>Become a Creator</MenuItem>
                    <MenuItem eventKey={4.2} onClick={() => this.props.history.push('/creator/dashboard/courses')}>Creator dashboard</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={4.3} onClick={() => this.props.history.push('/course/create')}>Create a course</MenuItem>
                  </NavDropdown>;
    }

    return (
      <div>
        <Navbar inverse collapseOnSelect className='header-wrapper'>
          <Navbar.Header className='header-navbar-header'>
            <Navbar.Brand className='header-brand'>
              <a href='/'>Teachsomebody</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='header-links' pullRight>
              <NavItem eventKey={1} href='/'>
                Courses
              </NavItem>
              {dropdown}
              {loginprofile_button}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Modal show={this.state.show_req_creator_modal} onHide={this.handleReqModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Become a creator</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I would like to request to become a creator for teachsomebody.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleReqModalClose}>Close</Button>
            <Button bsStyle="info" onClick={this.handleReqModalClose}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    login: state.login
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLogin: setLogin
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));