import React from "react";
import Header from './header';
import CarouselForHome from './carouselforhome';
import CourseList from './courselist';
import AdsAndInfo from './adsandinfo';
import Footer from './footer';

import '../styles/home.css';
import '../styles/maincontent.css';
/**/

export default class CourseHome extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='main-content'>
          <CarouselForHome />
          <CourseList />
          <AdsAndInfo />
        </div>
        <Footer />
      </div>
    );
  }
}
