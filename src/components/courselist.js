import React from "react";
import {Grid, Row, Col, Thumbnail} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {replaceSpaceWithUnderscore} from '../util';

import electrodepng from '../images/electrode.png';

import '../styles/courselist.css';

export default class CourseList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      courselist: [],
      col_size: 4
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/courses')
    .then(res => res.json())
    .then(resjson => {
      let len = resjson.courselist.length;
      let colsize = 4;
      if (len>0 && len<3){
        colsize = 12/len;
      }
      this.setState({
        courselist: resjson.courselist,
        col_size: colsize
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  render (){
    let rows = [];
    let i = 0;
    let j = 0;
    let chunk = 12/this.state.col_size;
    for (i=0; i<this.state.courselist.length; i+=chunk){
      let inner = [];
      for (j=i; (j<i+chunk) && (j<this.state.courselist.length); j++){
        inner.push(
          <Col key={this.state.courselist[j].code}
            xs={this.state.col_size} 
            md={this.state.col_size} 
            lg={this.state.col_size} 
            className='courselist-thumbnail-col'
          >
            <Link to={`/${this.state.courselist[j].code}/${replaceSpaceWithUnderscore(this.state.courselist[j].name.toLowerCase())}`}>
              <Thumbnail src={electrodepng} alt="242x200" className='courselist-thumbnail'>
                <div >
                  <h6>Learn {this.state.courselist[j].name}</h6>
                </div>
              </Thumbnail>
            </Link>
          </Col>
        );
      }
      rows.push(
        <Row className='row' key={i}>
          {inner}
        </Row>
      );
    }
    return (
      <div className='courselist-wrapper'>
        <Grid className='courselist-container'>
          {rows}
        </Grid>
      </div>
    );
  }   
}