import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import './Header.css';

const Header = ({ activeSection, setActiveSection, user, setUser }) => {
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
     
      setUser(null);
      toast.success('Logged out successfully');
      setActiveSection('home');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
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
        {user ? (
          <div className="user-section">
            <span className="user-email">{user.email}</span>
            <button 
              className={`auth-btn ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('dashboard')}
            >
              Dashboard
            </button>
            <button className="auth-btn logout-btn-alt" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          authItems.map(item => (
            <button
              key={item.id}
              className={`auth-btn ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.name}
            </button>
          ))
        )}
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