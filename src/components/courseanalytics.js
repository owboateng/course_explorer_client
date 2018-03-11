import React from "react";
import {withRouter} from 'react-router-dom';
import {BarChart} from 'react-d3-components';
import {Panel} from 'react-bootstrap';

import '../styles/courseanalytics.css';

/** 
 * Responsible for retrieving and rendering analytics 
 * data of courses.
*/
class CourseAnalytics extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      sections_with_stats: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/course/sections/' + this.props.match.params.code + '/stats')
    .then(res => res.json())
    .then(resjson => {
      this.setState({
        sections_with_stats: resjson.sectionlist,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let chart = '';
    if (this.state.sections_with_stats.length !== 0){
      let data_reads = [{
        values: this.state.sections_with_stats.map((section) => {
          return {x: section.title, y: section.reads}
        })
      }];
      chart = <BarChart
                data={data_reads}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                xAxis={{label: "Section number"}}
                yAxis={{label: "Number of reads"}}
              />;
    }
    return (
      <Panel className='courseedithome-panel'>
        <Panel.Heading className='courseedithome-panel-heading'>
          <span>Course analytics</span>
        </Panel.Heading >
        <Panel.Body>              
          {chart}
        </Panel.Body>
      </Panel>
    );
  }
}
export default withRouter(CourseAnalytics);