import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cyberEarthImage from '../images/cyberearth.png';
import SearchableCountrySelect from '../components/SearchableCountrySelect';

function Compare() {
  const navigate = useNavigate();
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

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
      // User not logged in, redirect to signup
      navigate('/signup');
      return;
    }
    
    // User is logged in, proceed to results page
    // TODO: Connect to backend API to generate results
    // For now, navigate to results page
    navigate('/compare/results', { state: { policyOne, policyTwo } });
    
    console.log('Generate clicked', { policyOne, policyTwo });
  };

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
                <SearchableCountrySelect
                  name="country"
                  value={policyOne.country}
                  onChange={handlePolicyOneChange}
                  className="parameter-input"
                  placeholder="Select Country"
                />
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
                <SearchableCountrySelect
                  name="country"
                  value={policyTwo.country}
                  onChange={handlePolicyTwoChange}
                  className="parameter-input"
                  placeholder="Select Country"
                />
              </div>
            </div>
          </div>
          
          <button type="button" className="generate-btn" onClick={handleGenerate}>Generate</button>
        </div>
      </div>
    </div>
  );
}

export default Compare;

