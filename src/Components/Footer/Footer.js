import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} College Portal | Computer Science Department</p>
    </footer>
  );
};

export default Footer;