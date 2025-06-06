import React, { useState, useEffect } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import { supabase } from '../../supabaseClient';

const Login = ({ setActiveSection }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success('Welcome Back!');
      console.log('Login successful', data);
    } catch (error) {
      toast.error(error.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin // Adjust as needed
        }
      });

      if (error) throw error;
    } catch (error) {
      toast.error(error.message || 'Social login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>Remember me</span>
            </label>
            <a href="#forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="signup-link">
            Don't have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={() => setActiveSection('signup')}
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="social-login">
          <p>Or sign in with</p>
          <div className="social-icons">
            <button 
              className="social-icon google"
              onClick={() => handleSocialLogin('google')}
            >
              <i className="fab fa-google"></i>
            </button>
            <button 
              className="social-icon facebook"
              onClick={() => handleSocialLogin('facebook')}
            >
              <i className="fab fa-facebook-f"></i>
            </button>
            <button 
              className="social-icon github"
              onClick={() => handleSocialLogin('github')}
            >
              <i className="fab fa-github"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;