import React from 'react';
import { Link } from 'react-router-dom';
import './BreedProfile.css';
import 'animate.css';

export default function BreedProfile({ breed }) {
  const info = breed ? {
    grooming: breed.grooming || ["Weekly brushing", "Bath as needed", "Nail trim monthly"],
    vaccination: breed.vaccination || ["DHPP at 6,9,12 weeks", "Rabies at 16 weeks", "Annual boosters"],
    diet: breed.diet || ["Rice, meat, ragi for puppies", "High protein, local grains, vegetables"]
  } : { grooming:[], vaccination:[], diet:[] };

  return (
    <div className="breed-profile-bg py-5 container animate__animated animate__fadeIn">
      <div className="mb-3 d-flex flex-wrap gap-2 justify-content-center">
        <Link className="btn btn-primary animate__animated animate__slideInLeft" to="/select-breed">← Change Breed</Link>
        <Link className="btn btn-warning animate__animated animate__slideInLeft" to="/vaccination-reminders">Vaccination Reminders</Link>
        <Link className="btn btn-success animate__animated animate__slideInRight" to="/grooming-schedules">Grooming</Link>
        <Link className="btn btn-info animate__animated animate__slideInRight" to="/dietplan">Food Plans</Link>
      </div>
      {breed ? (
        <div className="card mx-auto shadow-lg animate__animated animate__fadeInDown" style={{maxWidth:"600px"}}>
          <img src={breed.img} alt={breed.name} className="card-img-top breed-img animate__animated animate__zoomIn"/>
          <div className="card-body">
            <h2 className="text-primary animate__animated animate__flip">{breed.name}</h2>
            <h6 className="text-muted">{breed.origin}</h6>
            <p>{breed.description}</p>
            <hr />
            <h4>Grooming Schedules</h4>
            <ul>{info.grooming.map((item,i) => <li key={i} className="animate__animated animate__fadeInLeft">{item}</li>)}</ul>
            <h4 className="mt-2">Vaccination</h4>
            <ul>{info.vaccination.map((item,i) => <li key={i} className="animate__animated animate__fadeInRight">{item}</li>)}</ul>
            <h4 className="mt-2">Nutritive Indian Diet Plans</h4>
            <ul>{info.diet.map((item,i) => <li key={i} className="animate__animated animate__fadeInUp">{item}</li>)}</ul>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center">Please select a breed first from <Link to="/select-breed">Breed Selection</Link>!</div>
      )}
    </div>
  );
}
