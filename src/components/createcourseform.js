import React from "react";
import { withRouter } from 'react-router-dom';
import { Panel, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import '../styles/createcourseform.css';

/**/

class CreateCourseForm extends React.Component {
    render() {
        return (
            <div>
                <Panel className='createcourseform-panel'>
                    <Panel.Heading className='createcourseform-heading'>New course</Panel.Heading>
                    <Panel.Body>
                        <Form>
                            <FormGroup
                            >
                                <ControlLabel className='createcourseform-label'>Enter course name</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="e.g. Physics"
                                />
                            </FormGroup>
                            <Button
                                bsStyle="info"
                                className='createcourseform-button'
                                onClick={() => this.props.history.push('/course/edit')}
                            >Proceed
</Button>
                        </Form>
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}
export default withRouter(CreateCourseForm);