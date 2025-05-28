import React from 'react';
import './Programs.css';

const Program = ({ setActiveSection }) => {
  const programs = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      description: "Master full-stack web development with our intensive 12-week program. Learn React, Node.js, and modern JavaScript frameworks.",
      duration: "12 Weeks",
      level: "Intermediate",
      price: "$1,499",
      features: [
        "Hands-on projects",
        "Career support",
        "Mentorship",
        "Portfolio building"
      ]
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Dive into data analysis, machine learning, and visualization with Python and R. Perfect for beginners looking to enter the field.",
      duration: "8 Weeks",
      level: "Beginner",
      price: "$999",
      features: [
        "Python & R programming",
        "Pandas & NumPy",
        "Machine learning basics",
        "Real-world datasets"
      ]
    },
    {
      id: 3,
      title: "UX/UI Design Masterclass",
      description: "Learn user-centered design principles, prototyping, and testing. Create stunning interfaces that solve real problems.",
      duration: "6 Weeks",
      level: "All Levels",
      price: "$799",
      features: [
        "Figma & Sketch",
        "User research",
        "Wireframing",
        "Portfolio projects"
      ]
    }
  ];

  return (
    <div className="program-container">
      <div className="program-card">
        <div className="program-header">
          <h2>Our Programs</h2>
          <p>Choose the path that fits your career goals</p>
        </div>

        <div className="program-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-item">
              <div className="program-item-header">
                <h3>{program.title}</h3>
                <span className="program-level">{program.level}</span>
              </div>
              <p className="program-description">{program.description}</p>
              
              <div className="program-details">
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{program.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{program.price}</span>
                </div>
              </div>

              <ul className="program-features">
                {program.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <button 
                className="program-button"
                onClick={() => setActiveSection('signup')}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Program;