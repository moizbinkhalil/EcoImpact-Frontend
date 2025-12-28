import React, { useState, useEffect } from 'react';
import logo from './images/logo.png';
import earthImage from './images/earth.png';
import cyberEarthImage from './images/cyberearth.png';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentWord, setCurrentWord] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Simulate page states
  const [simulateData, setSimulateData] = useState({
    duration: '',
    carbonPrice: '',
    country: ''
  });
  
  // Compare page states
  const [policyOne, setPolicyOne] = useState({
    duration: '',
    carbonPrice: '',
    country: ''
  });
  const [policyTwo, setPolicyTwo] = useState({
    duration: '',
    carbonPrice: '',
    country: ''
  });
  
  // Form states
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentResultsPage, setCurrentResultsPage] = useState(null);
  
  const words = ['FUTURE', 'مستقبل', '未来'];
  
  // Check if user is logged in on component mount
  useEffect(() => {
    // TODO: Replace with actual token check from backend
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const animationLines = [
    'CO2 Level',
    'Change in Employment Rate',
    'Effect on GDP',
    'Temperature Change'
  ];

  const cards = [
    {
      heading: 'Set Your Climate Strategy',
      text: 'Adjust key policy parameters like carbon price, afforestation rate, and emission limits using intuitive sliders and dropdowns.'
    },
    {
      heading: 'Let the AI Forecast the Future',
      text: 'Our machine learning models process your inputs to simulate real-time climate and economic outcomes, from CO2 reduction to GDP impact.'
    },
    {
      heading: 'View Interactive Results',
      text: 'See your policy\'s results through dynamic graphs showing emissions, employment, and cost-of-living trends, all in one interactive dashboard.'
    }
  ];

  // Form input handlers
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation functions
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

  // API call functions - Ready for backend integration
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
      // handleSuccessfulSignup();
      
      // For now, just log the data and simulate success
      console.log('Signup data:', signupData);
      // Simulate successful signup for testing
      localStorage.setItem('token', 'demo-token');
      handleSuccessfulSignup();
      
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred during signup' });
    } finally {
      setLoading(false);
    }
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
      // handleSuccessfulLogin();
      
      // For now, just log the data and simulate success
      console.log('Login data:', loginData);
      // Simulate successful login for testing
      localStorage.setItem('token', 'demo-token');
      handleSuccessfulLogin();
      
    } catch (error) {
      setErrors({ submit: error.message || 'An error occurred during login' });
    } finally {
      setLoading(false);
    }
  };

  // Reset forms when modals close
  const closeSignup = () => {
    setShowSignup(false);
    setSignupData({ name: '', email: '', password: '' });
    setErrors({});
  };

  const closeLogin = () => {
    setShowLogin(false);
    setLoginData({ email: '', password: '' });
    setErrors({});
  };

  const handleSimulateChange = (e) => {
    const { name, value } = e.target;
    setSimulateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePolicyOneChange = (e) => {
    const { name, value } = e.target;
    setPolicyOne(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePolicyTwoChange = (e) => {
    const { name, value } = e.target;
    setPolicyTwo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userLoggedIn = !!token || isLoggedIn;
    
    if (!userLoggedIn) {
      // User not logged in, show signup modal
      setShowSignup(true);
      return;
    }
    
    // User is logged in, proceed to results page
    // TODO: Connect to backend API to generate results
    // For now, we'll set a results page state
    const pageType = currentPage === 'simulate' ? 'simulate-results' : 'compare-results';
    setCurrentResultsPage(pageType);
    
    console.log('Generate clicked', currentPage === 'simulate' ? simulateData : { policyOne, policyTwo });
  };
  
  // Update login state after successful login
  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setLoginData({ email: '', password: '' });
    setErrors({});
    // TODO: Store token from API response
    // localStorage.setItem('token', data.token);
  };
  
  // Update signup state after successful signup
  const handleSuccessfulSignup = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
    setSignupData({ name: '', email: '', password: '' });
    setErrors({});
    // TODO: Store token from API response
    // localStorage.setItem('token', data.token);
  };

  const renderResultsPage = () => {
    if (currentResultsPage === 'simulate-results') {
      return (
        <div className="page-container results-page">
          <div className="page-background">
            <div className="cyber-earth-container">
              <img src={cyberEarthImage} alt="Cyber Earth" className="cyber-earth" />
            </div>
          </div>
          <div className="page-content-wrapper">
            <div className="page-content">
              <h2 className="page-title">Simulation Results</h2>
              <p className="page-description">Your simulation results will be displayed here.</p>
              <button className="generate-btn" onClick={() => setCurrentResultsPage(null)}>Back to Simulate</button>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentResultsPage === 'compare-results') {
      return (
        <div className="page-container results-page">
          <div className="page-background">
            <div className="cyber-earth-container">
              <img src={cyberEarthImage} alt="Cyber Earth" className="cyber-earth" />
            </div>
          </div>
          <div className="page-content-wrapper">
            <div className="page-content">
              <h2 className="page-title">Comparison Results</h2>
              <p className="page-description">Your comparison results will be displayed here.</p>
              <button className="generate-btn" onClick={() => setCurrentResultsPage(null)}>Back to Compare</button>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderPage = () => {
    // Show results page if active
    if (currentResultsPage) {
      return renderResultsPage();
    }
    
    if (currentPage === 'simulate') {
      return (
        <div className="page-container simulate-page">
          <div className="page-background">
            <div className="cyber-earth-container">
              <img src={cyberEarthImage} alt="Cyber Earth" className="cyber-earth" />
            </div>
          </div>
          <div className="page-content-wrapper">
            <div className="page-content">
              <h2 className="page-title">Set Input Parameters</h2>
              <p className="page-subtitle">Policy One</p>
              
              <form className="parameters-form" onSubmit={handleGenerate}>
                <div className="input-cards">
                  <div className="input-card">
                    <label className="input-label">Duration</label>
                    <select 
                      name="duration" 
                      className="parameter-input"
                      value={simulateData.duration}
                      onChange={handleSimulateChange}
                    >
                      <option value="">Select Duration</option>
                      <option value="1">1 Year</option>
                      <option value="5">5 Years</option>
                      <option value="10">10 Years</option>
                      <option value="20">20 Years</option>
                    </select>
                  </div>
                  
                  <div className="input-card">
                    <label className="input-label">Carbon Price Rate</label>
                    <input 
                      type="text" 
                      name="carbonPrice" 
                      className="parameter-input"
                      placeholder="Enter rate"
                      value={simulateData.carbonPrice}
                      onChange={handleSimulateChange}
                    />
                  </div>
                  
                  <div className="input-card">
                    <label className="input-label">Country</label>
                    <select 
                      name="country" 
                      className="parameter-input"
                      value={simulateData.country}
                      onChange={handleSimulateChange}
                    >
                      <option value="">Select Country</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                    </select>
                  </div>
                </div>
                
                <button type="submit" className="generate-btn">Generate</button>
              </form>
              
              <div className="page-description">
                <p>Configure key policy settings, duration, carbon price, and region. Generate real-time projections of how your climate strategy will affect both the environment and the economy.</p>
                <p>After running the simulation, Eco-Impact AI displays clear insights on GDP impact, CO2 reduction, employment change, and cost of living, supported by interactive charts for deeper analysis.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentPage === 'compare') {
      return (
        <div className="page-container compare-page">
          <div className="page-background">
            <div className="cyber-earth-container">
              <img src={cyberEarthImage} alt="Cyber Earth" className="cyber-earth" />
            </div>
          </div>
          <div className="page-content-wrapper">
            <div className="page-content">
              <div className="policy-section">
                <h2 className="page-title">Set Input Parameters</h2>
                <p className="page-subtitle">Policy One</p>
                
                <div className="input-cards">
                  <div className="input-card">
                    <label className="input-label">Duration</label>
                    <select 
                      name="duration" 
                      className="parameter-input"
                      value={policyOne.duration}
                      onChange={handlePolicyOneChange}
                    >
                      <option value="">Select Duration</option>
                      <option value="1">1 Year</option>
                      <option value="5">5 Years</option>
                      <option value="10">10 Years</option>
                      <option value="20">20 Years</option>
                    </select>
                  </div>
                  
                  <div className="input-card">
                    <label className="input-label">Carbon Price Rate</label>
                    <input 
                      type="text" 
                      name="carbonPrice" 
                      className="parameter-input"
                      placeholder="Enter rate"
                      value={policyOne.carbonPrice}
                      onChange={handlePolicyOneChange}
                    />
                  </div>
                  
                  <div className="input-card">
                    <label className="input-label">Country</label>
                    <select 
                      name="country" 
                      className="parameter-input"
                      value={policyOne.country}
                      onChange={handlePolicyOneChange}
                    >
                      <option value="">Select Country</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="policy-section">
                <h2 className="page-title">Set Input Parameters</h2>
                <p className="page-subtitle">Policy Two</p>
                
                <div className="input-cards">
                  <div className="input-card">
                    <label className="input-label">Duration</label>
                    <select 
                      name="duration" 
                      className="parameter-input"
                      value={policyTwo.duration}
                      onChange={handlePolicyTwoChange}
                    >
                      <option value="">Select Duration</option>
                      <option value="1">1 Year</option>
                      <option value="5">5 Years</option>
                      <option value="10">10 Years</option>
                      <option value="20">20 Years</option>
                    </select>
                  </div>
                  
                  <div className="input-card">
                    <label className="input-label">Carbon Price Rate</label>
                    <input 
                      type="text" 
                      name="carbonPrice" 
                      className="parameter-input"
                      placeholder="Enter rate"
                      value={policyTwo.carbonPrice}
                      onChange={handlePolicyTwoChange}
                    />
                  </div>
                  
                  <div className="input-card">
                    <label className="input-label">Country</label>
                    <select 
                      name="country" 
                      className="parameter-input"
                      value={policyTwo.country}
                      onChange={handlePolicyTwoChange}
                    >
                      <option value="">Select Country</option>
                      <option value="usa">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="canada">Canada</option>
                      <option value="germany">Germany</option>
                      <option value="france">France</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <button type="button" className="generate-btn" onClick={handleGenerate}>Generate</button>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="navbar-links">
            <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>Home</a>
            <a href="#simulate" className={`nav-link ${currentPage === 'simulate' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('simulate'); }}>Simulate</a>
            <a href="#compare" className={`nav-link ${currentPage === 'compare' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setCurrentPage('compare'); }}>Compare</a>
            <a href="#signup" className="nav-link signup-btn" onClick={(e) => { e.preventDefault(); setShowSignup(true); }}>Sign Up</a>
          </div>
        </div>
      </nav>

      {renderPage()}

      {currentPage === 'home' && (
      <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-radial-gradient"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-main">
            <h1 className="hero-title">
              <span className="hero-title-fixed">MODEL THE</span>{' '}
              <span className="hero-title-animated">
                {words[currentWord]}
              </span>
            </h1>
            <p className="hero-subtitle">Simulate Climate Policies Today</p>
            
            <div className="hero-bottom">
              <div className="hero-left">
                <div className="animation-lines-container">
                  <div className="animation-lines">
                    {animationLines.map((line, index) => (
                      <div 
                        key={`line-${index}`} 
                        className="animation-line"
                      >
                        {line}
                      </div>
                    ))}
                    {animationLines.map((line, index) => (
                      <div 
                        key={`line-duplicate-${index}`} 
                        className="animation-line"
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="hero-right">
                <p className="hero-description">
                  An AI-powered simulator for evaluating environmental and economic policy impacts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="how-it-works-background">
          <div className="dots-pattern"></div>
        </div>
        <div className="how-it-works-content">
          <h2 className="how-it-works-title">How it Work</h2>
          <div className="cards-container">
            {cards.map((card, index) => (
              <div key={index} className="how-it-works-card">
                <h3 className="card-heading">{card.heading}</h3>
                <p className="card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission">
        <div className="our-mission-background">
          <div className="our-mission-dots-pattern"></div>
        </div>
        <div className="our-mission-content">
          <div className="earth-container">
            <img src={earthImage} alt="Earth" className="earth-image" />
          </div>
          <div className="mission-text-container">
            <h2 className="mission-title">Our Mission</h2>
            <div className="mission-text">
              <p>
                We believe data can empower humanity to act smarter against climate change. 
                Our mission is to bridge the gap between complex climate science and practical 
                decision-making through the power of artificial intelligence.
              </p>
              <p>
                By transforming raw environmental and economic data into interactive simulations, 
                Eco-Impact AI enables policymakers, researchers, and communities to explore the 
                real-world outcomes of their climate strategies before they're implemented.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3 className="footer-title">Join the Movement Toward Data-Driven Climate Action</h3>
            <p className="footer-subtitle">
              Simulate smarter policies, visualize their impact, and take meaningful steps toward a sustainable future.
            </p>
            <button className="footer-button" onClick={() => setCurrentPage('simulate')}>Start Simulation</button>
          </div>
          <div className="footer-right">
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <span>f</span>
              </a>
              <a href="#" className="social-icon instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="social-icon globe">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      </>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="auth-modal-overlay" onClick={closeSignup}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeSignup}>×</button>
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
                  <span className="auth-link" onClick={() => { closeSignup(); setShowLogin(true); }}>Login now</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="auth-modal-overlay" onClick={closeLogin}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLogin}>×</button>
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
                  <span className="auth-link" onClick={() => { closeLogin(); setShowSignup(true); }}>Sign up now</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
