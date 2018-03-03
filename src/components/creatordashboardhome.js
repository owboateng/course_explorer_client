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

    this.state = {
      courselist: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then(resjson => {
      this.setState({
        courselist: resjson.courselist,
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    if (!this.props.login.loggedin){
      return <Redirect to='/login'/>;
    }

    let rows = this.state.courselist.map((course) => {
      return (
        <ButtonToolbar className='creatordashboardhome-toolbar' key={course.code}>
          <ButtonGroup className='creatordashboardhome-button-group'>
            <Button 
              className='creatordashboardhome-menu-detail-button course-name'
              onClick={()=>this.props.history.push('/course/edit/' + course.code + '/' + course.name.toLowerCase())}
            >
              {course.name}
            </Button>
            <Button 
              className='creatordashboardhome-menu-detail-button info'
              onClick={()=>this.props.history.push('/course/analytics/' + course.code + '/' + course.name.toLowerCase())}
            >Analytics</Button>
          </ButtonGroup>
        </ButtonToolbar>
      );
    });
    return (
      <div>
        <Header />
        <div className='main-content'>
          <div className='creatordashboardhome-menu-wrapper'>
            <h3 className='creatordashboardhome-heading'>Creator Dashboard</h3>
            <Nav className='creatordashboardhome-nav' 
              bsStyle='tabs' 
              activeKey={1}
            >
              <NavItem eventKey={1} onClick={() => this.props.history.push('/creator/dashboard/courses')}>
                Courses
              </NavItem>
            </Nav>
          </div>
          <div className='creatordashboardhome-menu-detail-wrapper'>
            {rows}
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