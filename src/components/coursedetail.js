import React from "react";
import {ListGroup, ListGroupItem} from 'react-bootstrap';
/**/

export default class CourseDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      course: {},
      sections: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/course/' + this.props.match.params.code)
    .then(res => res.json())
    .then(resjson => {
      fetch('http://localhost:5000/api/course/sections/' + this.props.match.params.code)
      .then(res2 => res2.json())
      .then(res2json => {
        this.setState({
          course: resjson.course,
          sections: res2json.sectionlist
        });
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let sections_div_items = this.props.sections.map((section)=>{
      return (
        <ListGroupItem href="#">
          {section.title}
        </ListGroupItem>
      );
    });
    return (
      <div>
        <div className='left'>
          <ListGroup>
            {sections_div_items}
          </ListGroup>
        </div>
        <div className='right'>
          {}
        </div>
      </div>
    );
  }
}
