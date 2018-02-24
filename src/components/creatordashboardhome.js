import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import Header from './header';
import {Nav, NavItem, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import Footer from './footer';

import '../styles/home.css';
import '../styles/maincontent.css';
import '../styles/creatordashboardhome.css';
/**/

class CreatorDashboardHome extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    if (!this.props.login.loggedin){
      return <Redirect to='/login'/>;
    }
    let detail_map = {
      'courses': 1,
      'analytics': 2
    }
    return (
      <div>
        <Header />
        <div className='main-content'>
          <div className='creatordashboardhome-menu-wrapper'>
            <h3 className='creatordashboardhome-heading'>Creator Dashboard</h3>
            <Nav className='creatordashboardhome-nav' 
              bsStyle='tabs' 
              activeKey={detail_map[this.props.match.params.detail]}
            >
              <NavItem eventKey={1} onClick={() => this.props.history.push('/creator/dashboard/courses')}>
                Courses
              </NavItem>
              <NavItem eventKey={2} onClick={() => this.props.history.push('/creator/dashboard/analytics')}>
                Analytics
              </NavItem>
            </Nav>
          </div>
          <div className='creatordashboardhome-menu-detail-wrapper'>
            <ButtonToolbar className='toolbar'>
              <ButtonGroup className='creatordashboardhome-button-group'>
                <Button className='creatordashboardhome-menu-detail-button'>Course name</Button>
                <Button className='creatordashboardhome-menu-detail-button'>Students</Button>
                <Button className='creatordashboardhome-menu-detail-button'>Reviews</Button>
                <Button className='creatordashboardhome-menu-detail-button'>Conversion</Button>
              </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar className='creatordashboardhome-toolbar not-first'>
              <ButtonGroup className='creatordashboardhome-button-group'>
                <Button className='creatordashboardhome-menu-detail-button'>Course name</Button>
                <Button className='creatordashboardhome-menu-detail-button'>Students</Button>
                <Button className='creatordashboardhome-menu-detail-button'>Reviews</Button>
                <Button className='creatordashboardhome-menu-detail-button'>Conversion</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    login: state.login,
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatorDashboardHome);