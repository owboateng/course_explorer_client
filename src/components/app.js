import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginHome from "./loginhome";
import CourseHome from "./coursehome";
import CreateCourseHome from './createcoursehome';
import CreatorDashboardHome from './creatordashboardhome';
import CourseEditHome from './coursedithome';
import CourseDetailHome from './coursedetailHome';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={CourseHome} />
          <Route exact path='/login' component={LoginHome} />
          <Redirect exact from='/courses/trending' to='/' />
          <Route exact path='/courses/:detail' component={CourseHome} />
          <Route exact path='/course/create' component={CreateCourseHome} />
          <Route exact path='/creator/dashboard/:detail' component={CreatorDashboardHome} />
          <Route exact path='/course/edit/:code/:name' component={CourseEditHome} />
          <Route exact path='/course/analytics/:code/:name' component={CourseEditHome} />
          <Route exact path='/:course_code/:course_name/:section_id/:section_title' component={CourseDetailHome} />
          <Route exact path='/:course_code/:course_name' component={CourseDetailHome} />
        </Switch>
      </Router>
    );
  }
}

export default App;
