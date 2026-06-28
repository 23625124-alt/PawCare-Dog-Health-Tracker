import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard({ breed }) {
  return (
    <div className="container py-5 text-center">
      <h2>Welcome! <span role="img" aria-label="dog">🐕</span> Your Breed: <span className="text-primary">{breed.name}</span></h2>
      <div className="row mt-4 justify-content-center">
        {/* Each module as a large card */}
        <div className="col-md-3 mb-4">
          <Link to="/disease-prediction" className="btn btn-outline-danger w-100 h-100">Disease Prediction</Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/activity-update" className="btn btn-outline-success w-100 h-100">Daily Activity Update</Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/diet-plan" className="btn btn-outline-warning w-100 h-100">Nutritive Foods</Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/vaccination-reminders" className="btn btn-outline-primary w-100 h-100">Vaccination</Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/grooming" className="btn btn-outline-info w-100 h-100">Grooming Tips</Link>
        </div>
        <div className="col-md-3 mb-4">
          <Link to="/health-docs" className="btn btn-outline-secondary w-100 h-100">Upload Health Docs</Link>
        </div>
      </div>
    </div>
  );
}
