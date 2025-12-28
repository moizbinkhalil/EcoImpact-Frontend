import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Simulate from './pages/Simulate';
import Compare from './pages/Compare';
import SimulateResults from './pages/SimulateResults';
import CompareResults from './pages/CompareResults';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/simulate" element={<Simulate />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/simulate/results" element={<SimulateResults />} />
        <Route path="/compare/results" element={<CompareResults />} />
      </Routes>
    </div>
  );
}

export default App;
