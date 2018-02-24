import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';

import '../styles/coursesectionslist.css';

export default class CourseSectionsList extends React.Component {

  constructor(props){
    super(props);
  }

  render (){
    return (
      <div className='main-wrapper'>
        <ListGroup>
            <ListGroupItem href="#" active>
                Link 1
            </ListGroupItem>
            <ListGroupItem href="#">Link 2</ListGroupItem>
            <ListGroupItem href="#" disabled>
                Link 3
            </ListGroupItem>
        </ListGroup>
      </div>
    );
  }   
}