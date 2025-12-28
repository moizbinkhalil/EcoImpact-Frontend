import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
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

  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateLogin()) {
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      // TODO: Replace with your actual API endpoint
      // const response = await fetch('YOUR_API_URL/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: loginData.email,
      //     password: loginData.password
      //   })
      // });
      
      // const data = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(data.message || 'Login failed');
      // }
      
      // Handle success (e.g., store token, redirect)
      // localStorage.setItem('token', data.token);
      // navigate('/simulate');
      
      // For now, just log the data and simulate success
      console.log('Login data:', loginData);
      // Simulate successful login for testing
      localStorage.setItem('token', 'demo-token');
      navigate('/simulate');
      
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred during login' });
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
              <h2 className="auth-title">Welcome Back</h2>
              <form className="auth-form" onSubmit={handleLogin}>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                    value={loginData.email}
                    onChange={handleLoginChange}
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
                    value={loginData.password}
                    onChange={handleLoginChange}
                    disabled={loading}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                {errors.submit && <div className="error-message error-message-submit">{errors.submit}</div>}
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <div className="auth-divider"></div>
              <p className="auth-switch">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">Sign up now</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

