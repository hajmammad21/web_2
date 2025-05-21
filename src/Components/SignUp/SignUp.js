import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaUniversity } from 'react-icons/fa';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    studentId: '',
    department: 'computer_science'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Data:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Join our community of learners and innovators</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <span className="input-icon"><FaLock /></span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <span className="input-icon"><FaIdCard /></span>
            <input
              type="text"
              name="studentId"
              placeholder="Student ID"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
          </div>

          <div className="input-group">
            <span className="input-icon"><FaUniversity /></span>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="select-input"
            >
              <option value="computer_science">Computer Science</option>
              <option value="engineering">Engineering</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
            </select>
            <div className="underline"></div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>

          <div className="login-link">
            Already have an account? <a href="#login">Log in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;