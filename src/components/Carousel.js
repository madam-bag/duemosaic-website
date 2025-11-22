import React, { useState, useEffect } from 'react';
import './Carousel.css';

// Easy to change: Update this array with your image paths
// Paths are relative to the public folder
const carouselImages = [
  '/images/8-BS_Office,_Luxembourg/bs_office_1a.jpg',
  '/images/4-Villa_in_Luxembourg/1_maison_sketch.png',
  '/images/3-Row_houses_in_Mamer,_Luxembourg/s1.jpg',
  '/images/9-Vega_House_Restaurant_in_Mainz,_Germany/10.jpg',
  '/images/1-_ES_House_in_Saint_Nazaire,_France/Esma_house_car.JPG',
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000); // Change slide every 3 seconds (faster)

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ zIndex: index === currentIndex ? 2 : 1 }}
          >
            <img 
              src={image} 
              alt={`Carousel slide ${index + 1}`}
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
        ‹
      </button>
      <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
        ›
      </button>

      {/* Dots indicator */}
      <div className="carousel-dots">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;

