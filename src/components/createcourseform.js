import React from "react";
import { withRouter } from 'react-router-dom';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import '../styles/createcourseform.css';

/**/

class CreateCourseForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: ''
    }
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  }

  getValidationState = () => {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  render() {
    return (
      <div>
        <Panel className='createcourseform-panel'>
          <Panel.Heading className='createcourseform-heading'>New course</Panel.Heading>
          <Panel.Body>
            <Form>
              <FormGroup
                validationState={this.getValidationState}
              >
                <ControlLabel className='createcourseform-label'>Enter course name</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="e.g. Physics"
                    onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                bsStyle="info"
                className='createcourseform-button'
                type='submit'
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
export default withRouter(CreateCourseForm);