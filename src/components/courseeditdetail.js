import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import CourseSectionForm from './coursesectionform';
import CourseSectionsList from './coursesectionslist';
import {
        Panel, Button, Glyphicon, Modal
       } from 'react-bootstrap';
import {replaceSpaceWithUnderscore} from '../util';

/**/

class CourseEditDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      course: {},
      sections: [],
      show_section_form: false,
      show_modal: false
    }
  }

  fetchCourseSections = () => {
    fetch('http://localhost:5000/api/course/' + this.props.match.params.code)
    .then(res => res.json())
    .then(resjson => {
      fetch('http://localhost:5000/api/course/sections/' + this.props.match.params.code)
      .then(res2 => res2.json())
      .then(res2json => {
        this.setState({
          course: resjson.course,
          sections: res2json.sectionlist
        });
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount(){
    this.fetchCourseSections();
  }

  hideSectionForm = () => {
    this.setState({
      show_section_form: false
    });
    this.fetchCourseSections();
  }  

  handleModalOpen = section => {
    this.setState({
      show_modal: true,
    });
  }

  handleModalClose = () => {
    this.setState({
      show_modal: false,
    });
  }

  handleCourseDelete = () => {
    fetch('http://localhost:5000/api/course/delete',{
      method: 'post',
      body: JSON.stringify({
        gg_token_id: this.props.login.gg_token_id,
        course_code: this.state.course.code
      })
    })
    .then(res => res.json())
    .then(resjson => {
      if (!resjson.user_verified){
        this.props.setLogin(false, '');
      }
      this.handleModalClose();
      this.props.history.push('/creator/dashboard/courses');
    })
    .catch(error => {
      console.log(error);
    });
  }

  handlePreviewCourse = () => {
    let url = '/' + this.state.course.code + '/' + 
              replaceSpaceWithUnderscore(this.state.course.name) + '/' + 
              this.state.sections[0].id + '/' + 
              replaceSpaceWithUnderscore(this.state.sections[0].title);
    this.props.history.push(url);
  }

  render() {
    let section_form = '';
    let add_section_button = <Button className='add-section' 
                              onClick={() => this.setState({show_section_form: true})}>
                              <Glyphicon glyph="glyphicon glyphicon-plus-sign" /> Add section
                            </Button>;
    if (this.state.show_section_form){
      section_form = <CourseSectionForm 
                        section=''
                        input_type='new'
                        title=''
                        content=''
                        hideFunc={this.hideSectionForm}
                      />;
      add_section_button = '';
    }

    return (
      <div>
        <Panel className='courseedithome-panel'>
          <Panel.Heading className='courseedithome-panel-heading'>
            <span>Course sections</span>
            <Button className='course-delete'
              bsStyle='danger'
              bsSize='small'
              onClick={this.handleModalOpen}
            >Delete course</Button>
            <Button className='course-preview'
              bsStyle='primary' 
              bsSize='small'
              onClick={this.handlePreviewCourse}
            >Preview course</Button>
          </Panel.Heading >
          <Panel.Body>
            <CourseSectionsList 
              refreshSections={this.fetchCourseSections}
              sections={this.state.sections}
              />
            {section_form}
            {add_section_button}
          </Panel.Body>
        </Panel>
        <Modal show={this.state.show_modal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete course:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete: <b>{this.state.course.name}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Cancel</Button>
            <Button bsStyle="info" onClick={this.handleCourseDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseEditDetail));