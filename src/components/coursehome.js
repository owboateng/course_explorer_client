import React from "react";
import Header from './header';
import SearchContent from './searchcontent';
import CarouselForHome from './carouselforhome';
import CategoriesList from './categorieslist';
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
          <SearchContent />
          <CarouselForHome />
          <CategoriesList 
              heading='Course categories'
          />
          <CourseList />
          <AdsAndInfo />
        </div>
        <Footer />
      </div>
    );
  }
}
