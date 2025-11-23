import React from 'react';
import Carousel from './Carousel';

function ProjectCarousel({ images = [], autoPlayInterval = 3000 }) {
  return <Carousel images={images} autoPlayInterval={autoPlayInterval} />;
}

export default ProjectCarousel;

