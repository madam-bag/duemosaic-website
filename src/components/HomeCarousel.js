import React from 'react';
import Carousel from './Carousel';
import './HomeCarousel.css';

// Homepage carousel images (full-size)
const homeCarouselImages = [
  '/images/8-BS_Office,_Luxembourg/bs_office_1a.jpg',
  '/images/4-Villa_in_Luxembourg/1_maison_sketch.png',
  '/images/3-Row_houses_in_Mamer,_Luxembourg/s1.jpg',
  '/images/9-Vega_House_Restaurant_in_Mainz,_Germany/10.jpg',
  '/images/1-_ES_House_in_Saint_Nazaire,_France/Esma_house_car.JPG',
  '/images/5-DE_Villa_in_Junglister,_Luxembourg/h1.jpg',
  '/images/5-DE_Villa_in_Junglister,_Luxembourg/h2.jpg',
  '/images/6-Techno_center_coworking_office_space_in_Istanbul,_Turkey/image-tekno.JPG',
];

function HomeCarousel() {
  return (
    <div className="home-carousel-wrapper">
      <Carousel images={homeCarouselImages} autoPlayInterval={3000} />
      <div className="carousel-top-fade"></div>
    </div>
  );
}

export default HomeCarousel;

