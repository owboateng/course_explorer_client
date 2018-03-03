import React from "react";
import {GoogleLogin} from 'react-google-login';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLogin} from '../actions/index';

import '../styles/glogin.css';

class GLogin extends React.Component {

  constructor(props){
    super(props);

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response){
    if (response.Zi){
      fetch('http://localhost:5000/api/user/add',{
        method: 'post',
        body: JSON.stringify({
          gg_token_id: response.Zi.id_token
        })
      })
      .then(res => res.json())
      .then(resjson => {
        if (resjson.user_verified === true){
          this.props.setLogin(true, response.Zi.id_token);
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
    else {
      this.props.setLogin(false);
    }
  }

  render (){
    if (this.props.login.loggedin){
      return <Redirect to='/'/>
    }
    
    return (
      <div className='login-wrapper'>
        <div className='login-inner-content'>
          <h1>Login to teachsomebody.com</h1>
          <p>
            Do you love to explore new courses? Would you like to meet the tutors 
            of these courses? Do you love to read articles? Would you like to submit your 
            articles and reach a bigger audience? Then teachsomebody is a site for you.
          </p>
          <GoogleLogin
            className='gbutton'
            clientId="614752998231-9vjvf1uk8jhibh20sqn6svb3lksrtukn.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          <p className='no-account'>
            <span>No Google account?</span>
            <span> Create an account <a href='https://accounts.google.com/SignUp?hl=en'>here</a></span>
          </p>
        </div>
      </div>
    );
  }   
}

function mapStateToProps(state){
  return {
    login: state.login
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLogin: setLogin
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GLogin));