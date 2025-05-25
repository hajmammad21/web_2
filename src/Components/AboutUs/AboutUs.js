import React from 'react';
import { FaCode, FaUsers, FaBook, FaLaptopCode, FaGraduationCap } from 'react-icons/fa';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-card">
        <h2 className="about-us-title">
          <FaCode className="title-icon" /> About Our Project
        </h2>
        
        <div className="about-section">
          <div className="about-item">
            <FaBook className="about-icon" />
            <h3>Course Project</h3>
            <p>This web application was developed as part of our <strong>Web Development Course</strong> at Khayyam Univercity.</p>
          </div>
          
          <div className="about-item">
            <FaUsers className="about-icon" />
            <h3>Our Team</h3>
            <p>Created by Computer Science students passionate about building modern web applications.</p>
          </div>
          
          <div className="about-item">
            <FaLaptopCode className="about-icon" />
            <h3>Technologies Used</h3>
            <ul>
              <li>React.js</li>
              <li>React Router</li>
              <li>CSS3 Animations</li>
              <li>React Icons</li>
            </ul>
          </div>
          
          <div className="about-item">
            <FaGraduationCap className="about-icon" />
            <h3>Learning Goals</h3>
            <p>This project helped us master React components, state management, routing, and responsive design.</p>
          </div>
        </div>
        
        <div className="course-info">
          <h3>Course Details</h3>
          <p><strong>Course:</strong> Web Development</p>
          <p><strong>Professor:</strong> Dr.Ali Rezaee</p>
          <p><strong>Semester:</strong> Spring 2025</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;