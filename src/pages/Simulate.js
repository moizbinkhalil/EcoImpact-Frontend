import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cyberEarthImage from '../images/cyberearth.png';
import SearchableCountrySelect from '../components/SearchableCountrySelect';

function Simulate() {
  const navigate = useNavigate();
  const [simulateData, setSimulateData] = useState({
    duration: '',
    carbonPrice: '',
    country: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSimulateChange = (e) => {
    const { name, value } = e.target;
    setSimulateData(prev => ({
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
    navigate('/simulate/results', { state: { data: simulateData } });
    
    console.log('Generate clicked', simulateData);
  };

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
                <SearchableCountrySelect
                  name="country"
                  value={simulateData.country}
                  onChange={handleSimulateChange}
                  className="parameter-input"
                  placeholder="Select Country"
                />
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

export default Simulate;

