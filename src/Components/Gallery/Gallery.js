import React, { useState } from 'react';
import './Gallery.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import techConferenceImg from '../../images/techconference.jpg';
import Ourcreativeteam from '../../images/Ourcreativeteam.jpg';
import websitedevelopment from '../../images/webdevelop.jpg';
import designworkshop from '../../images/designworkshop.jpg';
import mobileapp from '../../images/mobileapp.jpg';
import startup from '../../images/startup.jpg';
import teamcollab from '../../images/teamcollaboration.jpg';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryItems = [
    { id: 1, category: 'events', src: techConferenceImg, title: 'Tech Conference 2025' },
    { id: 2, category: 'projects', src: websitedevelopment, title: 'Web Development Project' },
    { id: 3, category: 'team', src: Ourcreativeteam, title: 'Our Creative Team' },
    { id: 4, category: 'events', src: designworkshop, title: 'Design Workshop' },
    { id: 5, category: 'projects', src: mobileapp, title: 'Mobile App Launch' },
    { id: 6, category: 'team', src: 'https://source.unsplash.com/random/600x400/?office', title: 'Office Environment' },
    { id: 7, category: 'events', src: 'https://source.unsplash.com/random/600x400/?meetup', title: 'Community Meetup' },
    { id: 8, category: 'projects', src: startup, title: 'Startup Project' },
    { id: 9, category: 'team', src: teamcollab, title: 'Team Collaboration' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const handleImageClick = (title) => {
    toast.info(`Viewing: ${title}`, {
      position: 'bottom-center',
      autoClose: 2000,
    });
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
              onClick={() => handleImageClick(item.title)}
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
      <ToastContainer />
    </div>
  );
};

export default Gallery;