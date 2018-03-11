import React from "react";
import {Carousel} from 'react-bootstrap';

import carousel_img from '../images/pencil.jpg';
import '../styles/carouselforhome.css';

/**
 * Represents a carousel with changing images on the homepage.
 */
class CarouselForHome extends React.Component {
  render() {
    return (
      <div>
        <Carousel slide={false} controls={false} className='carousel'>
          <Carousel.Item>
            <img src={carousel_img} className='image' alt=''/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
export default CarouselForHome;