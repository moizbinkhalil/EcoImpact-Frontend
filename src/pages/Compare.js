import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cyberEarthImage from '../images/cyberearth.png';
import SearchableCountrySelect from '../components/SearchableCountrySelect';

function Compare() {
  const navigate = useNavigate();
  const [policyOne, setPolicyOne] = useState({
    duration: 1,
    policyType: 'carbonTax',
    carbonPrice: '',
    country: ''
  });
  const [policyTwo, setPolicyTwo] = useState({
    duration: 1,
    policyType: 'carbonTax',
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
    // Map policyTypeOne back to policyType for state
    const stateName = name === 'policyTypeOne' ? 'policyType' : name;
    setPolicyOne(prev => ({
      ...prev,
      [stateName]: value
    }));
  };

  const handlePolicyTwoChange = (e) => {
    const { name, value } = e.target;
    // Map policyTypeTwo back to policyType for state
    const stateName = name === 'policyTypeTwo' ? 'policyType' : name;
    setPolicyTwo(prev => ({
      ...prev,
      [stateName]: value
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
                <label className="input-label">
                  Duration: {policyOne.duration} {policyOne.duration === 1 ? 'Year' : 'Years'}
                </label>
                <input
                  type="range"
                  name="duration"
                  min="1"
                  max="20"
                  value={policyOne.duration}
                  onChange={handlePolicyOneChange}
                  className="duration-slider"
                />
                <div className="slider-labels">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
              
              <div className="input-card">
                <label className="input-label">Policy Type</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="policyTypeOne"
                      value="carbonTax"
                      checked={policyOne.policyType === 'carbonTax'}
                      onChange={handlePolicyOneChange}
                    />
                    <span>Carbon Tax</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="policyTypeOne"
                      value="ets"
                      checked={policyOne.policyType === 'ets'}
                      onChange={handlePolicyOneChange}
                    />
                    <span>Emissions Trading System (ETS)</span>
                  </label>
                </div>
              </div>
              
              <div className="input-card">
                <label className="input-label">Carbon Price Rate</label>
                <div className="carbon-price-input-wrapper">
                  <input 
                    type="number" 
                    name="carbonPrice" 
                    className="parameter-input"
                    placeholder="Enter rate"
                    value={policyOne.carbonPrice}
                    onChange={handlePolicyOneChange}
                    step="1"
                    min="0"
                  />
                  <span className="carbon-price-unit">USD/tonCO2</span>
                </div>
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
                <label className="input-label">
                  Duration: {policyTwo.duration} {policyTwo.duration === 1 ? 'Year' : 'Years'}
                </label>
                <input
                  type="range"
                  name="duration"
                  min="1"
                  max="20"
                  value={policyTwo.duration}
                  onChange={handlePolicyTwoChange}
                  className="duration-slider"
                />
                <div className="slider-labels">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>
              
              <div className="input-card">
                <label className="input-label">Policy Type</label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="policyTypeTwo"
                      value="carbonTax"
                      checked={policyTwo.policyType === 'carbonTax'}
                      onChange={handlePolicyTwoChange}
                    />
                    <span>Carbon Tax</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="policyTypeTwo"
                      value="ets"
                      checked={policyTwo.policyType === 'ets'}
                      onChange={handlePolicyTwoChange}
                    />
                    <span>Emissions Trading System (ETS)</span>
                  </label>
                </div>
              </div>
              
              <div className="input-card">
                <label className="input-label">Carbon Price Rate</label>
                <div className="carbon-price-input-wrapper">
                  <input 
                    type="number" 
                    name="carbonPrice" 
                    className="parameter-input"
                    placeholder="Enter rate"
                    value={policyTwo.carbonPrice}
                    onChange={handlePolicyTwoChange}
                    step="1"
                    min="0"
                  />
                  <span className="carbon-price-unit">USD/tonCO2</span>
                </div>
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

