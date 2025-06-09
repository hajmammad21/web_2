import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaIdCard, FaUniversity } from 'react-icons/fa';
import './SignUp.css';
import { toast } from 'react-toastify';
import { supabase } from '../../supabaseClient';

const SignUp = ({ setActiveSection }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    studentId: '',
    department: 'computer_science',
  });

  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast.error('You must agree to the Terms and Privacy Policy.');
      return;
    }

    const { email, password, fullName, studentId, department } = formData;

    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      toast.error('Password must be 6+ characters with at least 1 uppercase letter and 1 number');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { full_name: fullName }
        }
      });

      if (error) throw error;
      if (!data.user?.id) throw new Error('No user ID returned');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: data.user.id,
          full_name: fullName,
          student_id: studentId,
          department,
          email
        }]);

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      toast.success('Account created! Check your email to confirm.');
      
      // Clear form after successful signup
      setFormData({
        fullName: '',
        email: '',
        password: '',
        studentId: '',
        department: 'computer_science',
      });
      setAgreeToTerms(false);
      
      // Optionally switch to login view
      setTimeout(() => {
        setActiveSection('login');
      }, 2000);
      
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                disabled={loading}
              />
              <span>
                I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <button 
              type="button" 
              className="link-button" 
              onClick={() => setActiveSection('login')}
              disabled={loading}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;