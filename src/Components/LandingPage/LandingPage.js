import React, { useEffect, useState } from 'react';
import './LandingPage.css';

const LandingPage = ({ setActiveSection }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="landing-container">
      <div className="bg-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="grid-overlay"></div>

      <div className="content-wrapper">
        <div className="hero-section">
          
          <div className="left-content">
            <div className={`heading-section ${animate ? 'animate-fadeInUp' : ''}`}>
              <div className="welcome-badge">
                🚀 Welcome to the Future of Learning
              </div>
              <h1 className="main-title">
                Computer
                <span className="gradient-text">Science</span>
                <span className="white-text">Department</span>
              </h1>
              <p className="subtitle">
                Join our vibrant community of innovators, problem-solvers, and future tech leaders. 
                Shape tomorrow's digital world today.
              </p>
            </div>

            <div className={`stats-grid ${animate ? 'animate-fadeInUp delay-200' : ''}`}>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Courses Available</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">25+</div>
                <div className="stat-label">Expert Faculty</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <div className="stat-label">Modern Labs</div>
              </div>
            </div>

            <div className={`features-grid ${animate ? 'animate-fadeInUp delay-300' : ''}`}>
              <div className="feature-card">
                <div className="feature-icon icon-education">🎓</div>
                <div className="feature-content">
                  <h3>World-Class Education</h3>
                  <p>Industry-aligned curriculum</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon icon-tech">💻</div>
                <div className="feature-content">
                  <h3>Cutting-Edge Labs</h3>
                  <p>Latest technology & equipment</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon icon-career">🚀</div>
                <div className="feature-content">
                  <h3>Career Success</h3>
                  <p>95% placement rate</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon icon-network">🌐</div>
                <div className="feature-content">
                  <h3>Global Network</h3>
                  <p>Alumni worldwide</p>
                </div>
              </div>
            </div>

            <div className={`cta-section ${animate ? 'animate-fadeInUp delay-400' : ''}`}>
              <button
                onClick={() => setActiveSection('programs')}
                className="cta-primary"
              >
                Explore Programs
                <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="cta-secondary">
                Virtual Tour
                <svg className="tour-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="right-visual">
            <div className={`visual-container ${animate ? 'animate-fadeInRight' : ''}`}>
              <div className="main-visual-card">
                <div className="floating-element floating-idea">💡</div>
                <div className="floating-element floating-research">🔬</div>

                <div className="code-window">
                  <div className="window-header">
                    <div className="window-controls">
                      <div className="control-btn red"></div>
                      <div className="control-btn yellow"></div>
                      <div className="control-btn green"></div>
                    </div>
                    <div className="file-name">main.py</div>
                  </div>
                  
                  <div className="code-content">
                    <div className="code-line">
                      <span className="keyword">def</span> <span className="function">future_ready</span><span className="punctuation">():</span>
                    </div>
                    <div className="code-line comment">
                      <span># Building tomorrow's tech leaders</span>
                    </div>
                    <div className="code-line">
                      <span className="variable">skills</span> = [<span className="string">"AI"</span>, <span className="string">"ML"</span>, <span className="string">"Web Dev"</span>]
                    </div>
                    <div className="code-line">
                      <span className="keyword">return</span> <span className="variable">success</span>
                    </div>
                  </div>
                </div>

                <div className="tech-stack">
                  <div className="tech-item">
                    <div className="tech-emoji">⚛️</div>
                    <div className="tech-label">React</div>
                  </div>
                  <div className="tech-item">
                    <div className="tech-emoji">🐍</div>
                    <div className="tech-label">Python</div>
                  </div>
                  <div className="tech-item">
                    <div className="tech-emoji">🤖</div>
                    <div className="tech-label">AI/ML</div>
                  </div>
                  <div className="tech-item">
                    <div className="tech-emoji">☁️</div>
                    <div className="tech-label">Cloud</div>
                  </div>
                </div>
              </div>

              <div className="floating-stat stat-job">
                <div className="floating-stat-text">98% Job Rate</div>
              </div>
              
              <div className="floating-stat stat-ranking">
                <div className="floating-stat-text">Top Rankings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;