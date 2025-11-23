import React, { useEffect } from 'react';
import './ImageModal.css';

function ImageModal({ image, images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <button className="modal-close" onClick={onClose} aria-label="Close modal">
        ×
      </button>
      {images.length > 1 && (
        <>
          <button className="modal-nav modal-nav-prev" onClick={onPrev} aria-label="Previous image">
            ‹
          </button>
          <button className="modal-nav modal-nav-next" onClick={onNext} aria-label="Next image">
            ›
          </button>
        </>
      )}
      <div className="image-modal-content">
        <img
          src={image}
          alt={`Image ${currentIndex + 1} of ${images.length}`}
          className="modal-image"
          onError={(e) => {
            console.error(`Failed to load image: ${image}`);
          }}
        />
        {images.length > 1 && (
          <div className="modal-counter">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageModal;

