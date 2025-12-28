import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Signup() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateSignup = () => {
    const newErrors = {};
    
    if (!signupData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!validateSignup()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // TODO: Replace with your actual API endpoint
      // const response = await fetch('YOUR_API_URL/signup', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: signupData.name,
      //     email: signupData.email,
      //     password: signupData.password
      //   })
      // });
      
      // const data = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(data.message || 'Signup failed');
      // }
      
      // Handle success (e.g., store token, redirect)
      // localStorage.setItem('token', data.token);
      // navigate('/simulate');
      
      // For now, just log the data and simulate success
      console.log('Signup data:', signupData);
      // Simulate successful signup for testing
      localStorage.setItem('token', 'demo-token');
      navigate('/simulate');
      
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred during signup' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="auth-page">
      <div className="auth-modal-overlay">
        <div className="auth-modal">
          <button className="close-btn" onClick={handleClose}>×</button>
          <div className="auth-container">
            <div className="auth-left">
              <div className="auth-gradient-circle"></div>
              <img src={logo} alt="Logo" className="auth-logo" />
            </div>
            <div className="auth-right">
              <h2 className="auth-title">Create Account</h2>
              <form className="auth-form" onSubmit={handleSignup}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                    value={signupData.name}
                    onChange={handleSignupChange}
                    disabled={loading}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    value={signupData.email}
                    onChange={handleSignupChange}
                    disabled={loading}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Password" 
                    className={`form-input ${errors.password ? 'form-input-error' : ''}`}
                    value={signupData.password}
                    onChange={handleSignupChange}
                    disabled={loading}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                {errors.submit && <div className="error-message error-message-submit">{errors.submit}</div>}
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </form>
              <div className="auth-divider"></div>
              <p className="auth-switch">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">Login now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

