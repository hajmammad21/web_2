import React from 'react';
import './LandingPage.css';
import landingImage from './men-hero.png';

const LandingPage = () => {
  return (
    <section className="landing-section">
      <div className="landing-image">
        <img src={landingImage} alt="College Campus" />
      </div>
      <div className="landing-text">
        <h2>Welcome to Computer Science Department</h2>
        <p>Join our vibrant community of learners and innovators...</p>
        <div className="landing-features">
          <div className="feature">
            <span>🎓</span> 50+ Courses Available
          </div>
          <div className="feature">
            <span>👨‍🏫</span> Expert Faculty
          </div>
          <div className="feature">
            <span>💻</span> Modern Labs
          </div>
        </div>
        <button className="cta-button">Explore Programs</button>
      </div>
    </section>
  );
};

export default LandingPage;