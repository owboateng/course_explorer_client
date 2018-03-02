import React from "react";
import Header from './header';
import CarouselForHome from './carouselforhome';
import AdsAndInfo from './adsandinfo';
import Footer from './footer';

import '../styles/home.css';
import '../styles/maincontent.css';
/**/

export default class CourseDetailHome extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='main-content'>
          <CarouselForHome />
          <AdsAndInfo />
        </div>
        <Footer />
      </div>
    );
  }
}
