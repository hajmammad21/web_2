import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import landingImage from './men-hero.png';

const LandingPage = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="landing-section">
      <div className={`landing-image ${animate ? 'animate-image' : ''}`}>
        <img src={landingImage} alt="College Campus" />
      </div>
      <div className="landing-text">
        <h2 className={animate ? 'staggered staggered-delay-1' : ''}>
          Welcome to Computer Science Department
        </h2>
        <p className={animate ? 'staggered staggered-delay-2' : ''}>
          Join our vibrant community of learners and innovators...
        </p>
        <div className="landing-features">
          <div className={animate ? 'feature staggered staggered-delay-3' : 'feature'}>
            <span>🎓</span> 50+ Courses Available
          </div>
          <div className={animate ? 'feature staggered staggered-delay-4' : 'feature'}>
            <span>👨‍🏫</span> Expert Faculty
          </div>
          <div className={animate ? 'feature staggered staggered-delay-5' : 'feature'}>
            <span>💻</span> Modern Labs
          </div>
        </div>
        <button className={animate ? 'cta-button staggered staggered-delay-5' : 'cta-button'}>
          Explore Programs
        </button>
      </div>
    </section>
  );
};

export default LandingPage;
