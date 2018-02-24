import React from "react";
import {Grid, Row, Col, Thumbnail, Button, } from 'react-bootstrap';

import electrodepng from '../images/electrode.png';

import '../styles/courselist.css';

export default class CourseList extends React.Component {

  constructor(props){
    super(props);
  }

  render (){
    return (
        <div className='courselist-wrapper'>
            <Grid className='courselist-container'>
                <Row className='row'>
                    <Col xs={4} md={4} lg={4} className='courselist-thumbnail-col'>
                    <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                        <div >
                            <h3>Learn Python</h3>
                            <p>Level: Beginer</p>
                        </div>
                    </Thumbnail>
                    </Col>
                    <Col xs={4} md={4} lg={4} className='courselist-thumbnail-col'>
                    <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                        <h3>Learn Python</h3>
                        <p>Level: Beginer</p>
                    </Thumbnail>
                    </Col>
                    <Col xs={4} md={4} lg={4} className='courselist-thumbnail-col'>
                    <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                        <h3>Learn Python</h3>
                        <p>Level: Beginer</p>
                    </Thumbnail>
                    </Col>
                </Row>
                <Row className='row'>
                    <Col xs={4} md={4} lg={4} className='courselist-thumbnail-col'>
                    <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                        <div >
                            <h3>Learn Python</h3>
                            <p>Level: Beginer</p>
                        </div>
                    </Thumbnail>
                    </Col>
                    <Col xs={4} md={4} lg={4} className='courselist-thumbnail-col'>
                    <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                        <h3>Learn Python</h3>
                        <p>Level: Beginer</p>
                    </Thumbnail>
                    </Col>
                    <Col xs={4} md={4} lg={4} className='courselist-thumbnail-col'>
                    <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                        <h3>Learn Python</h3>
                        <p>Level: Beginer</p>
                    </Thumbnail>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
  }   
}