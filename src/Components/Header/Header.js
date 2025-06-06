import React, { useState } from 'react';
import './Header.css';

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authItems = [
    { id: 'login', name: 'Login' },
    { id: 'signup', name: 'Sign Up' }
  ];

  const menuItems = [
    { id: 'home', name: 'Home' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'studentnames', name: 'Students' },
    { id: 'programs', name: 'Programs' },
    { id: 'aboutus', name: 'About Us' },
    { id: 'contactus', name: 'Contact Us' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <h1 className="logo">College Portal</h1>
      </div>

      <div className="header-right">
        {authItems.map(item => (
          <button
            key={item.id}
            className={`auth-btn ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
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

      {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;