import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import CourseEditDetail from './courseeditdetail';
import CourseAnalytics from './courseanalytics';
import {
        Panel, ListGroup, ListGroupItem, 
       } from 'react-bootstrap';

import '../styles/home.css';
import '../styles/maincontent.css';
import '../styles/courseedithome.css';

/**/

class CourseEditHome extends React.Component {
  render() {
    if (!this.props.login.loggedin){
      return <Redirect to='/login'/>;
    }
    let course_name = this.props.match.params.name;
    let detail_content = <CourseEditDetail />;
    let course_sections_active = true;
    if (this.props.match.url.includes('/course/analytics')){
      detail_content = <CourseAnalytics />;
      course_sections_active = false;
    }
    
    return (
      <div>
        <Header />
        <div className='main-content'>
          <div className='top-wrapper'>
              <h3 className='heading'>
              {course_name.charAt(0).toUpperCase() + course_name.slice(1)}
              </h3>
          </div>
          <div className='left'>
            <Panel className='courseedithome-panel'>
              <Panel.Heading className='courseedithome-panel-heading'>
                <span>Manage course</span>
              </Panel.Heading>
              <Panel.Body className='side-panel'>
                <ListGroup className='courseedithome-listgroup'>
                  <ListGroupItem 
                    onClick={()=>this.props.history.push(
                              '/course/edit/' + 
                              this.props.match.params.code + 
                              '/' + 
                              this.props.match.params.name)}
                    active={course_sections_active}
                    >Course sections</ListGroupItem>
                  <ListGroupItem 
                    onClick={()=>this.props.history.push(
                              '/course/analytics/' + 
                              this.props.match.params.code + 
                              '/' + 
                              this.props.match.params.name)}
                    active={!course_sections_active}
                  >Analytics</ListGroupItem>
                </ListGroup>
              </Panel.Body>
            </Panel>
          </div>
          <div className='center'>
            {detail_content}
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

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditHome);