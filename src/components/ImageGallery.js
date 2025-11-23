import React, { useState, useRef, useEffect, useCallback } from 'react';
import ImageModal from './ImageModal';
import { processImages, getThumbnail, getFullImage } from '../utils/imageUtils';
import './ImageGallery.css';

function ImageGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef(null);

  const itemWidth = 320; // 300px width + 20px gap

  // Check scroll boundaries
  const checkScrollBounds = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    // Check if we can scroll left (not at the start)
    setCanScrollLeft(scrollLeft > 0);
    
    // Check if we can scroll right (not at the end)
    // Use a small threshold (1px) to account for rounding
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  // Ensure gallery starts from the left on mount and check bounds
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      // Check bounds after a short delay to ensure layout is complete
      setTimeout(checkScrollBounds, 100);
    }
  }, [images, checkScrollBounds]);

  // Listen to scroll events to update button states
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollBounds();
    
    container.addEventListener('scroll', checkScrollBounds);
    window.addEventListener('resize', checkScrollBounds);
    
    return () => {
      container.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
    };
  }, [checkScrollBounds]);

  // Process images to get thumbnail and full-size paths
  const processedImages = processImages(images);
  const thumbnailImages = processedImages.map(img => getThumbnail(img));
  const fullImages = processedImages.map(img => getFullImage(img));

  const handleImageClick = (thumbnailPath, index) => {
    // Use full-size image for modal
    const fullImagePath = fullImages[index];
    setSelectedImage({ image: fullImagePath, index });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    if (selectedImage) {
      const nextIndex = (selectedImage.index + 1) % fullImages.length;
      setSelectedImage({ image: fullImages[nextIndex], index: nextIndex });
    }
  };

  const handlePrevImage = () => {
    if (selectedImage) {
      const prevIndex = (selectedImage.index - 1 + fullImages.length) % fullImages.length;
      setSelectedImage({ image: fullImages[prevIndex], index: prevIndex });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current && canScrollLeft) {
      scrollContainerRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && canScrollRight) {
      scrollContainerRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth'
      });
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="image-gallery">
        <button 
          className={`gallery-nav-btn gallery-nav-left ${!canScrollLeft ? 'disabled' : ''}`} 
          onClick={scrollLeft} 
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          ‹
        </button>
        <div className="gallery-scroll-container" ref={scrollContainerRef}>
          <div className="gallery-images">
            {thumbnailImages.map((thumbnailPath, index) => (
              <div
                key={index}
                className={`gallery-item ${hoveredIndex === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(thumbnailPath, index)}
              >
                <img
                  src={thumbnailPath}
                  alt={`Gallery image ${index + 1}`}
                  className="gallery-image"
                  onError={(e) => {
                    // Fallback to full-size image if thumbnail doesn't exist
                    const fullPath = fullImages[index];
                    if (e.target.src !== fullPath && fullPath) {
                      e.target.src = fullPath;
                    } else {
                      console.error(`Failed to load image: ${thumbnailPath}`);
                      e.target.style.display = 'none';
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <button 
          className={`gallery-nav-btn gallery-nav-right ${!canScrollRight ? 'disabled' : ''}`} 
          onClick={scrollRight} 
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          ›
        </button>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage.image}
          images={fullImages}
          currentIndex={selectedImage.index}
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </>
  );
}

export default ImageGallery;
