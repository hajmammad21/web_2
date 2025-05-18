import React, { useState } from 'react';
import './Header.css';

const Header = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', name: 'Home' },
    { id: 'login', name: 'Login' },
    { id: 'signup', name: 'Sign Up' },
    { id: 'aboutus', name: 'About Us' },
    { id: 'photos', name: 'Photos' },
    { id: 'contactus', name: 'Contact Us' },
    { id: 'aboutclass', name: 'About Class' },
    { id: 'studentnames', name: 'Students' }
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
      <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      <h1 className="logo">College Portal</h1>

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