import React from "react";
import {withRouter} from 'react-router-dom';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';
import path from 'path';

import '../styles/categorieslist.css';

class CategoriesList extends React.Component {
  constructor(props){
      super(props);
  }

  componentDidMount(){
    
  }

  render() {
    let  list_map= {
        'trending': false,
        'computer-science': false,
        'sat': false,
        'geography': false,
        'education': false,
        'philosophy': false
    };
    if (this.props.location.pathname === '/'){
      list_map['trending'] = true;
    }
    else{
      list_map[this.props.match.params.detail] = true;
    }
    

    return (
      <div className='categorieslist-wrapper'>
        <Panel className="categorieslist-panel">
          <Panel.Heading>{this.props.heading}</Panel.Heading>
          <Panel.Body className='categorieslist-panel-body'>
          <ListGroup className='categorieslist-group'>
            <ListGroupItem className='categorieslist-group-item' 
              active={list_map['trending']}
              onClick={() => this.props.history.push('/')}>Trending</ListGroupItem>
            <ListGroupItem className='categorieslist-group-item'
              active={list_map['computer-science']}
              onClick={() => this.props.history.push('/courses/computer-science')}>Computer Science</ListGroupItem>
            <ListGroupItem className='categorieslist-group-item'
              active={list_map['sat']}
              onClick={() => this.props.history.push('/courses/sat')}>SAT</ListGroupItem>
            <ListGroupItem className='categorieslist-group-item' 
              active={list_map['geography']}
              onClick={() => this.props.history.push('/courses/geography')}>Geography</ListGroupItem>
            <ListGroupItem className='categorieslist-group-item' 
              active={list_map['education']}
              onClick={() => this.props.history.push('/courses/education')}>Education</ListGroupItem>
            <ListGroupItem className='categorieslist-group-item' 
              active={list_map['philosophy']}
              onClick={() => this.props.history.push('/courses/philosophy')}>Philosophy</ListGroupItem>
          </ListGroup>
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}

export default withRouter(CategoriesList);