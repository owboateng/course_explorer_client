import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import WYSIWYGEditor from './wysiwygeditor';
import {Panel, Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {showSectionForm} from '../actions';

import '../styles/coursesectionform.css';

/**/

class CourseSectionForm extends React.Component {
  render() {
    return (
      <div>
        <Panel className='coursesectionform-panel'>
          <Panel.Heading className='coursesectionform-heading'>New section</Panel.Heading>
          <Panel.Body>
          <Form>
            <FormGroup>
              <FormControl
                type="text"
                placeholder='Title'
              />
              <div className='coursesectionform-wysiwyg' >
                <WYSIWYGEditor />
              </div>
            </FormGroup>
            <Button 
              bsStyle="default" 
              className='coursesectionform-button-default'
              onClick={() => this.props.showSectionForm(false)}
            >Cancel</Button>
            <Button bsStyle="info" className='coursesectionform-button-save'>Save</Button>
          </Form>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    sectionform: state.sectionform
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    showSectionForm: showSectionForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSectionForm);