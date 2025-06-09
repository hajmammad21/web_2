import React, { useState, useCallback, useMemo } from 'react';
import './Gallery.css';

const LazyImage = ({ src, alt, onClick, className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`lazy-image-container ${className}`} onClick={onClick}>
      {!loaded && !error && (
        <div className="image-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && (
        <div className="image-error">
          <span>Failed to load image</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        loading="lazy"
      />
    </div>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = useMemo(() => [
    { 
      id: 1, 
      category: 'events', 
      src: '/images/techconference.jpg', 
      title: 'Tech Conference 2025' 
    },
    { 
      id: 2, 
      category: 'projects', 
      src: '/images/webdevelop.jpg', 
      title: 'Web Development Project' 
    },
    { 
      id: 3, 
      category: 'team', 
      src: '/images/Ourcreativeteam.jpg', 
      title: 'Our Creative Team' 
    },
    { 
      id: 4, 
      category: 'events', 
      src: '/images/designworkshop.jpg', 
      title: 'Design Workshop' 
    },
    { 
      id: 5, 
      category: 'projects', 
      src: '/images/mobileapp.jpg', 
      title: 'Mobile App Launch' 
    },
    { 
      id: 6, 
      category: 'team', 
      src: '/images/office.jpg', 
      title: 'Office Environment' 
    },
    { 
      id: 7, 
      category: 'events', 
      src: '/images/meetup.jpg', 
      title: 'Community Meetup' 
    },
    { 
      id: 8, 
      category: 'projects', 
      src: '/images/startup.jpg', 
      title: 'Startup Project' 
    },
    { 
      id: 9, 
      category: 'team', 
      src: '/images/teamcollaboration.jpg', 
      title: 'Team Collaboration' 
    },
  ], []);

  const filteredItems = useMemo(() => {
    return activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const handleImageClick = useCallback((item) => {
    setSelectedImage(item);
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const handleKeyDown = useCallback((e, item) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(item);
    }
  }, [handleImageClick]);

  const handleLightboxKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  }, [closeLightbox]);

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleLightboxKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleLightboxKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [selectedImage, handleLightboxKeyDown]);

  return (
    <div className="gallery-container">
      <div className="gallery-card">
        <div className="gallery-header">
          <h2>Our Gallery</h2>
          <p>Explore our work, events, and team moments</p>
        </div>
        
        <div className="category-filter" role="tablist">
          {['all', 'events', 'projects', 'team'].map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              role="tab"
              aria-selected={activeCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid" role="grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => handleImageClick(item)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              role="button"
              tabIndex={0}
              aria-label={`View ${item.title} in lightbox`}
            >
              <LazyImage 
                src={item.src} 
                alt={item.title}
              />
              <div className="item-overlay">
                <h3>{item.title}</h3>
                <span>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-btn" 
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="lightbox-image"
            />
            <div className="lightbox-caption">
              <h3 id="lightbox-title">{selectedImage.title}</h3>
              <span>{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;