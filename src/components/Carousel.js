import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

function Carousel({ images = [], autoPlayInterval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Only start timer if there are images and autoPlayInterval is set
    if (images.length > 0 && autoPlayInterval > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, autoPlayInterval);
    }
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, autoPlayInterval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    startTimer(); // Reset timer when manually navigating
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    startTimer(); // Reset timer when manually navigating
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    startTimer(); // Reset timer when manually navigating
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="carousel">
      <div className="carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
            style={{ zIndex: index === currentIndex ? 2 : 1 }}
          >
            <img 
              src={image} 
              alt={image.includes('Luxembourg') ? `Architecture project in Luxembourg - Slide ${index + 1}` : 
                   image.includes('France') ? `Architecture project in France - Slide ${index + 1}` :
                   image.includes('Germany') ? `Architecture project in Germany - Slide ${index + 1}` :
                   image.includes('Turkey') ? `Architecture project in Turkey - Slide ${index + 1}` :
                   `Architecture project - Slide ${index + 1}`}
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load image: ${image}`);
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button className="carousel-arrow carousel-arrow-left" onClick={goToPrevious}>
            ‹
          </button>
          <button className="carousel-arrow carousel-arrow-right" onClick={goToNext}>
            ›
          </button>

          {/* Dots indicator */}
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
