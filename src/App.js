import React, { useState } from 'react';
import './App.css';
import landingImage from './men-hero.png'; // Make sure you have this image

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const menuItems = [
    { id: 'home', name: 'Home' },
    { id: 'login', name: 'Login' },
    { id: 'signup', name: 'Sign Up' },
    { id: 'aboutus', name: 'About Us' },
    { id: 'photos', name: 'Photo Gallery' },
    { id: 'contactus', name: 'Contact Us' },
    { id: 'aboutclass', name: 'Our Class' },
    { id: 'studentnames', name: 'Classmates' }
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
  };

  return (
    <div className="app">
      <header className="header">
        <button className="hamburger" onClick={toggleMenu}>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        </button>
        <h1 className="logo">College Portal</h1>
      </header>

      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="nav">
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}

      <main className="main-content">
        {activeSection === 'home' && (
          <section className="landing-section">
            <div className="landing-image">
              <img src={landingImage} alt="College Campus" />
            </div>
            <div className="landing-text">
              <h2>Welcome to Computer Science Department</h2>
              <p>Join our vibrant community of learners and innovators. Our program offers cutting-edge curriculum and hands-on experience to prepare you for the tech industry.</p>
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
        )}

        {activeSection === 'login' && (
          <section className="section">
            <h2>Login to Your Account</h2>
            <form className="login-form">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
          </section>
        )}

        {/* Add other sections as needed */}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} College Portal | Computer Science Department</p>
      </footer>
    </div>
  );
}

export default App;