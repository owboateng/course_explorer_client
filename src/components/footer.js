import React from "react";
import {withRouter} from 'react-router-dom';
import {Grid, Row, Col, Button} from 'react-bootstrap';

import '../styles/footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-wrapper'>
        <Grid>
          <Row className='footer-row'>
            <Col sm={6} md={3}>
                Become a Creator
            </Col>
            <Col sm={6} md={3}>
                About TeachSomebody
            </Col>
            <Col sm={6} md={3}>
            <a href='/'>Courses</a>
            </Col>
          </Row>
          <Row className='footer-row'>
            <Col sm={6} md={3}>
                Become a Mentor
            </Col>
            <Col sm={6} md={3}>
                For Schools
            </Col>
            <Col sm={6} md={3}>
            <a href='/'>Help</a>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default withRouter(Footer);