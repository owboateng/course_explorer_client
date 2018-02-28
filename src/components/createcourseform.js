import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import { Panel, Form, FormGroup, 
         ControlLabel, FormControl, 
         Button, HelpBlock } from 'react-bootstrap';
import {setLogin} from '../actions/index';
import {alphaNumericSpaceDash} from '../util';

import '../styles/createcourseform.css';

/**/

class CreateCourseForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
      validation_state: null,
      form_error: '',
      proceed_disabled: true
    }
  }

  handleChange = e => {
    let value = e.target.value;
    this.setState({ value: value });
    const length = value.length;
    let validation_state = null;
    let err = '';
    let proceed_disabled = true;
    if (length > 3 && alphaNumericSpaceDash(value)){
      validation_state = 'success';
      proceed_disabled = false;
    }
    else if (length <= 3){
      validation_state = 'error';
      err = 'Course name must be at least 4 characters';
      proceed_disabled = true;
    }
    else if (!alphaNumericSpaceDash(value)){
      validation_state = 'error';
      err = 'Course name may be made up of alphabets, numbers, spaces and dashes';
      proceed_disabled = true;
    }
    this.setState({
      validation_state: validation_state,
      form_error: err,
      proceed_disabled: proceed_disabled
    });
  }

  handleSubmit = () => {
    fetch('http://localhost:5000/api/course/add',{
      method: 'post',
      body: JSON.stringify({
        course_name: this.state.value,
        gg_token_id: this.props.login.gg_token_id
      })
    })
    .then(res => res.json())
    .then(resjson => {
      if (!resjson.user_verified){
        this.props.setLogin(false, '');
      }
      if (!resjson.course_created){
        this.setState({
          validation_state: 'error',
          form_error: 'Course name exists',
          proceed_disabled: true
        });
      }
      else{
        this.props.history.push('/creator/dashboard/courses');
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <Panel className='createcourseform-panel'>
          <Panel.Heading className='createcourseform-heading'>New course</Panel.Heading>
          <Panel.Body>
            <Form>
              <FormGroup
                validationState={this.state.validation_state}
              >
                <ControlLabel className='createcourseform-label'>Enter course name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="e.g. Physics"
                    onChange={this.handleChange}
                />
                <FormControl.Feedback/>
                <HelpBlock>{this.state.form_error}</HelpBlock>
              </FormGroup>
              <Button
                bsStyle="info"
                className='createcourseform-button'
                type='button'
                disabled={this.state.proceed_disabled}
                onClick={this.handleSubmit}
              >
              Proceed
              </Button>
            </Form>
          </Panel.Body>
        </Panel>
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
    setLogin: setLogin
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCourseForm));