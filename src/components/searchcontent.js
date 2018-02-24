import React from "react";
import {Form, FormGroup, FormControl} from 'react-bootstrap';

import '../styles/searchcontent.css';

export default class SearchContent extends React.Component {

  constructor(props){
    super(props);
  }

  render (){
    return (
      <div>
        <Form className='searchcontent-form'>
            <FormGroup bsSize="large">
                <FormControl type="text" placeholder="Search" className='searchcontent-input'/>
            </FormGroup>
        </Form>
      </div>
    );
  }   
}