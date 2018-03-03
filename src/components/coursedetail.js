import React from "react";
import { withRouter } from 'react-router-dom';
import {ListGroup, ListGroupItem, Panel} from 'react-bootstrap';
import {replaceSpaceWithUnderscore} from '../util';

import '../styles/coursedetail.css';
/**/

class CourseDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      sections: [],
      selected_section: {}
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/course/sections/' + this.props.match.params.course_code)
    .then(res2 => res2.json())
    .then(res2json => {
      let selected_sec = res2json.sectionlist[0];
      if (!this.props.match.params.section_id){
        this.props.history.push(
          this.props.match.url + '/' + 
          selected_sec.id + '/' + 
          replaceSpaceWithUnderscore(selected_sec.title)
        );
      }
      else{
        selected_sec = res2json.sectionlist.find(section => section.id == this.props.match.params.section_id);
      }
      
      this.setState({
        sections: res2json.sectionlist,
        selected_section:selected_sec
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  createMarkup = raw_html => {
    return {__html: raw_html };
  }

  render() {
    let sections_div_items = this.state.sections.map((section)=>{
      let is_active = false;
      if (section.id == this.state.selected_section.id){
        is_active = true;
      }
      return (
        <ListGroupItem 
          href={`/${section.course_code}/${this.props.match.params.course_name}/${section.id}/${replaceSpaceWithUnderscore(section.title)}`} 
          key={section.id}
          active={is_active}
        >
          {section.title}
        </ListGroupItem>
      );
    });
    return (
      <div className='course-detail-wrapper'>
        <div className='sections-list'>
          <ListGroup>
            {sections_div_items}
          </ListGroup>
        </div>
        <div className='section-text'>
          <Panel>
            <Panel.Heading>{this.state.selected_section.title}</Panel.Heading>
            <Panel.Body 
              dangerouslySetInnerHTML={this.createMarkup(this.state.selected_section.content)}
            ></Panel.Body>
          </Panel>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseDetail);
