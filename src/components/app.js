import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginHome from "./loginhome";
import CourseHome from "./coursehome";
import CreateCourseHome from './createcoursehome';
import CreatorDashboardHome from './creatordashboardhome';
import CourseEditHome from './coursedithome';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={CourseHome} />
          <Route exact path='/login' component={LoginHome} />
          <Redirect exact from='/courses/trending' to='/' />
          <Route exact path='/courses/:detail' component={CourseHome} />
          <Route exact={true} path='/course/create' component={CreateCourseHome} />
          <Route exact={true} path='/creator/dashboard/:detail' component={CreatorDashboardHome} />
          <Route exact={true} path='/course/edit/:code/:name' component={CourseEditHome} />
        </Switch>
      </Router>
    );
  }
}

export default App;
