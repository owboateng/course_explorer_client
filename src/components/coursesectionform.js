import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import CKEditor from 'react-ckeditor-component';
import {Panel, Form, FormGroup, FormControl, 
  Button, HelpBlock} from 'react-bootstrap';
import {setLogin} from '../actions';
import {alphaNumericSpaceDash, stripHtml} from '../util';

import '../styles/coursesectionform.css';

/**/

class CourseSectionForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      ckeditor_content: this.props.content,
      ckeditor_errs: '',
      ckeditor_is_valid: false,
      title: this.props.title,
      title_validation_state: null,
      title_errs: ''
    }
  }

  componentDidMount(){
    if (this.props.input_type === 'edit'){
      this.setState({
        title_validation_state: 'success',
        ckeditor_is_valid: true
      });
    }
  }

  onCKeditorChange = evt => {
    let content = evt.editor.getData();
    let raw_text = stripHtml(content);
    let err = '';
    let valid_state = true;
    if (raw_text.length < 50){
      err = 'Section content must be at least 50 characters';
      valid_state = false;
    }
    this.setState({
      ckeditor_content: content,
      ckeditor_errs: err,
      ckeditor_is_valid:valid_state
    });
  }

  handleTitleChange = e => {
    let value = e.target.value;
    this.setState({ title: value });
    const length = value.length;
    let validation_state = null;
    let err = '';
    if (length > 3 && alphaNumericSpaceDash(value)){
      validation_state = 'success';
    }
    else if (length <= 3){
      validation_state = 'error';
      err = 'Title must be at least 4 characters';
    }
    else if (!alphaNumericSpaceDash(value)){
      validation_state = 'error';
      err = 'Title may be made up of alphabets, numbers, spaces and dashes';
    }
    this.setState({
      title_validation_state: validation_state,
      title_errs: err,
    });
  }

  handleSubmit = () => {
    let url = 'http://localhost:5000/api/course/section/add';
    let fetch_body = {
      gg_token_id: this.props.login.gg_token_id,
      course_code: this.props.match.params.code,
      title: this.state.title,
      content: this.state.ckeditor_content 
    }
    if (this.props.input_type === 'edit'){
      url = 'http://localhost:5000/api/course/section/update';
      fetch_body = {
        gg_token_id: this.props.login.gg_token_id,
        section_id: this.props.section.id,
        title: this.state.title,
        content: this.state.ckeditor_content 
      }
    }
    fetch(url,{
      method: 'post',
      body: JSON.stringify(fetch_body)
    })
    .then(res => res.json())
    .then(resjson => {
      if (!resjson.user_verified){
        this.props.setLogin(false, '');
      }
      if (this.props.input_type !== 'edit' && !resjson.section_created){
        this.setState({
          title_validation_state: 'error',
          title_errs: 'Course section title exists',
        });
      }
      else{
        this.props.hideFunc();
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let save_disabled = true;
    if (this.state.ckeditor_is_valid && this.state.title_validation_state === 'success'){
      save_disabled = false;
    } 
    let form_heading = "Add new section";
    if (this.props.input_type === 'edit'){
      form_heading = 'Edit section';
    }
    return (
      <div>
        <Panel className='coursesectionform-panel'>
          <Panel.Heading className='coursesectionform-heading'>{form_heading}</Panel.Heading>
          <Panel.Body>
          <Form>
            <FormGroup validationState={this.state.title_validation_state}>
              <FormControl
                type="text"
                placeholder='Title'
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
              <FormControl.Feedback/>
              <HelpBlock>{this.state.title_errs}</HelpBlock>
            </FormGroup>
            <div className='coursesectionform-wysiwyg' >
              <CKEditor 
                content={this.state.ckeditor_content}
                events={{
                  change: this.onCKeditorChange
                }}
              />
              <div className='ckeditor-errors'>{this.state.ckeditor_errs}</div>
            </div>
            <Button 
              bsStyle="default" 
              className='coursesectionform-button-default'
              onClick={this.props.hideFunc}
            >Cancel</Button>
            <Button 
              bsStyle="info" 
              className='coursesectionform-button-save'
              disabled={save_disabled}
              onClick={this.handleSubmit}
            >Save</Button>
          </Form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
CourseSectionForm.propTypes = {
  hideFunc: PropTypes.func
}

function mapStateToProps(state){
  return {
    login: state.login,
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLogin: setLogin
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseSectionForm));