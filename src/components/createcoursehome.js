import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import Header from './header';
import CreateCourseForm from './createcourseform';
import Footer from './footer';

import '../styles/home.css';
import '../styles/maincontent.css';
import '../styles/createcoursehome.css';
/**/

class CreateCourseHome extends React.Component {
  render() {
    if (!this.props.login.loggedin){
      return <Redirect to='/login'/>;
    }
    return (
      <div>
        <Header />
        <div className='main-content'>
          <div className='createcoursehome-top-wrapper'>
            <h3 className='createcoursehome-heading'>Create course</h3>
          </div>
          <CreateCourseForm />
        </div>
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    login: state.login,
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourseHome);