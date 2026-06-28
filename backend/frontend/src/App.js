import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import DogProfile from './components/Dogs/DogProfile';
import DogList from './components/Dogs/DogList';
import AddDog from './components/Dogs/AddDog';
import VaccinationTracker from './components/Vaccinations/VaccinationTracker';
import HealthRecords from './components/Health/HealthRecords';
import DiseasePredictor from './components/Health/DiseasePredictor';
import GroomingTracker from './components/Grooming/GroomingTracker';
import BreedComparison from './components/Breeds/BreedComparison';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Set up axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/auth/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dogs" element={<DogList />} />
              <Route path="/dogs/add" element={<AddDog />} />
              <Route path="/dogs/:dogId" element={<DogProfile />} />
              <Route path="/dogs/:dogId/vaccinations" element={<VaccinationTracker />} />
              <Route path="/dogs/:dogId/health" element={<HealthRecords />} />
              <Route path="/dogs/:dogId/grooming" element={<GroomingTracker />} />
              <Route path="/disease-predictor" element={<DiseasePredictor />} />
              <Route path="/breeds" element={<BreedComparison />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
