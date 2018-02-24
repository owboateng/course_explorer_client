import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import CourseSectionForm from './coursesectionform';
import {Panel, ListGroup, ListGroupItem, Button, Glyphicon} from 'react-bootstrap';
import {showSectionForm} from '../actions';

import '../styles/home.css';
import '../styles/maincontent.css';
import '../styles/courseedithome.css';

/**/

class CourseEditHome extends React.Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render() {
    if (!this.props.login.loggedin){
      return <Redirect to='/login'/>;
    }
    let section_form = '';
    let add_section_button = <Button className='add-section' 
                              onClick={() => this.props.showSectionForm(true)}>
                              <Glyphicon glyph="glyphicon glyphicon-plus-sign" /> Add section
                            </Button>;
    if (this.props.sectionform.show){
      section_form = <CourseSectionForm />;
      add_section_button = '';
    }
    return (
      <div>
        <Header />
        <div className='main-content'>
          <div className='top-wrapper'>
              <h3 className='heading'>Course Name</h3>
          </div>
          <div className='left'>
            <Panel className='panel'>
              <Panel.Heading className='panel-heading'>
                <span>Manage course</span>
              </Panel.Heading>
              <Panel.Body>
                <ListGroup className='listgroup'>
                  <ListGroupItem href='#'>Course Info</ListGroupItem>
                  <ListGroupItem href='#'>Course sections</ListGroupItem>
                </ListGroup>
              </Panel.Body>
            </Panel>
          </div>
          <div className='center'>
            <Panel className='panel'>
              <Panel.Heading className='panel-heading'>
                <span>Course sections</span>
                <Button bsStyle="primary">Preview course</Button>
              </Panel.Heading >
              <Panel.Body>
                {section_form}
                {add_section_button}
              </Panel.Body>
            </Panel>
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
    sectionform: state.sectionform
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showSectionForm: showSectionForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseEditHome);