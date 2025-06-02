import React, { useState } from 'react';
import './Gallery.css';
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import techConferenceImg from '../../images/techconference.jpg';
import Ourcreativeteam from '../../images/Ourcreativeteam.jpg';
import websitedevelopment from '../../images/webdevelop.jpg';
import designworkshop from '../../images/designworkshop.jpg';
import mobileapp from '../../images/mobileapp.jpg';
import startup from '../../images/startup.jpg';
import teamcollab from '../../images/teamcollaboration.jpg';
import office from '../../images/office.jpg';
import meetup from '../../images/meetup.jpg';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    { id: 1, category: 'events', src: techConferenceImg, title: 'Tech Conference 2025' },
    { id: 2, category: 'projects', src: websitedevelopment, title: 'Web Development Project' },
    { id: 3, category: 'team', src: Ourcreativeteam, title: 'Our Creative Team' },
    { id: 4, category: 'events', src: designworkshop, title: 'Design Workshop' },
    { id: 5, category: 'projects', src: mobileapp, title: 'Mobile App Launch' },
    { id: 6, category: 'team', src: office, title: 'Office Environment' },
    { id: 7, category: 'events', src: meetup, title: 'Community Meetup' },
    { id: 8, category: 'projects', src: startup, title: 'Startup Project' },
    { id: 9, category: 'team', src: teamcollab, title: 'Team Collaboration' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleImageClick = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-card">
        <div className="gallery-header">
          <h2>Our Gallery</h2>
          <p>Explore our work, events, and team moments</p>
        </div>

        <div className="category-filter">
          {['all', 'events', 'projects', 'team'].map(category => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="gallery-item"
              onClick={() => handleImageClick(item)}
            >
              <img src={item.src} alt={item.title} />
              <div className="item-overlay">
                <h3>{item.title}</h3>
                <span>{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLightbox}>&times;</button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="lightbox-image"
            />
            <div className="lightbox-caption">
              <h3>{selectedImage.title}</h3>
              <span>{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Gallery;