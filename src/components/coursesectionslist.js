import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Panel, Button, Glyphicon, Modal} from 'react-bootstrap';
import {setLogin} from '../actions';
import PropTypes from 'prop-types';
import CourseSectionForm from './coursesectionform';


import '../styles/coursesectionslist.css';

class CourseSectionsList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      show_edit_form: false,
      show_delete_modal: false,
      section: {}
    }
  }

  showSectionForm = section => {
    this.setState({
      show_edit_form: true,
      section: section
    });
  }

  hideSectionForm = () => {
    this.setState({
      show_edit_modal: false,
      section: {}
    });
    this.props.refreshSections();
  }

  handleDeleteModalOpen = section => {
    this.setState({
      show_delete_modal: true,
      section: section
    });
  }

  handleModalClose = () => {
    this.setState({
      show_delete_modal: false,
      section: {}
    });
  }

  handleSectionDelete = () => {
    fetch('http://localhost:5000/api/course/section/delete',{
      method: 'post',
      body: JSON.stringify({
        gg_token_id: this.props.login.gg_token_id,
        section_id: this.state.section.id
      })
    })
    .then(res => res.json())
    .then(resjson => {
      if (!resjson.user_verified){
        this.props.setLogin(false, '');
      }
      this.handleModalClose();
      this.props.refreshSections();
    })
    .catch(error => {
      console.log(error);
    });
  }

  render (){
    let count = 0;
    let sections = this.props.sections.map((section) => {
      count += 1;
      let edit_form = '';
      if (section.id === this.state.section.id){
        edit_form = <CourseSectionForm 
                      section={section}
                      input_type='edit'
                      title={section.title}
                      content={section.content}
                      hideFunc={this.hideSectionForm}
                    />;
      }
      return (
        <Panel key={section.id} className='coursesectionslist-panel'>
          <Panel.Body>
            <span>Section {count}: </span>
            {section.title}
            <Button 
              className='section-delete'
              onClick={() => this.handleDeleteModalOpen(section)}
            >
              <Glyphicon glyph="glyphicon glyphicon-remove" />
            </Button>
            <Button 
              className='section-edit'
              onClick={() => this.showSectionForm(section)}
            >
              <Glyphicon glyph="glyphicon glyphicon-pencil" />
            </Button>
            {edit_form}
          </Panel.Body>
        </Panel>
      );
    });
    return (
      <div className='list-wrapper'>
        {sections}
        <Modal show={this.state.show_delete_modal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete section:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete: <b>{this.state.section.title}</b>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModalClose}>Cancel</Button>
            <Button bsStyle="info" onClick={this.handleSectionDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }   
}

CourseSectionsList.propTypes = {
  refreshSections: PropTypes.func
}

function mapStateToProps(state){
  return {
    login: state.login,
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLogin: setLogin
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSectionsList);