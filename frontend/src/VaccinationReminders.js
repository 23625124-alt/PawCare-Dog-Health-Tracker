import React, { useState } from 'react';
import './App.css';

// Suggested core vaccines by breed (common for dogs)
const breedVaccines = {
  "Rajapalayam": [
    "Rabies",
    "DHPPiL (Distemper, Hepatitis, Parvovirus, Parainfluenza, Leptospirosis)",
    "Bordetella (Kennel cough)",
    "Leptospirosis",
    "Corona (optional)"
  ],
  "Kanni": [
    "Rabies",
    "DHPPiL",
    "Leptospirosis",
    "Bordetella"
  ],
  "Chippiparai": [
    "Rabies",
    "DHPPiL",
    "Bordetella",
    "Leptospirosis"
  ],
  "Kombai": [
    "Rabies",
    "DHPPiL",
    "Leptospirosis",
    "Bordetella"
  ],
  "Pomeranian": [
    "Rabies",
    "DHPPiL",
    "Bordetella",
    "Leptospirosis",
    "Lyme disease"
  ],
  "Shih Tzu": [
    "Rabies",
    "DHPPiL",
    "Bordetella",
    "Leptospirosis"
  ],
  "Golden Retriever": [
    "Rabies",
    "DHPPiL",
    "Bordetella",
    "Leptospirosis",
    "Lyme disease",
    "Coronavirus"
  ],
  "Labrador Retriever": [
    "Rabies",
    "DHPPiL",
    "Leptospirosis",
    "Bordetella",
    "Lyme disease"
  ],
  "Husky": [
    "Rabies",
    "DHPPiL",
    "Bordetella",
    "Leptospirosis"
  ],
  "Bulldog": [
    "Rabies",
    "DHPPiL",
    "Bordetella",
    "Leptospirosis",
    "Coronavirus"
  ]
};

function getVaccines(breed) {
  return breedVaccines[breed] || [
    "Rabies",
    "DHPPiL",
    "Leptospirosis",
    "Bordetella"
  ];
}

export default function VaccinationReminders({ breed }) {
  const [reminders, setReminders] = useState([]);

  function addReminder() {
    const name = prompt(`Enter vaccine name for ${breed} (e.g. Rabies, DHPPiL):`);
    if (!name) return;
    const date = prompt("Enter due date (DD/MM/YYYY):");
    if (!date) return;
    setReminders([{ name, date }, ...reminders]);
  }

  return (
    <div className="card animate__animated animate__zoomIn" style={{
      background: 'linear-gradient(120deg, #caf0f8 50%, #ade8f4 99%)', borderRadius: 16,
      boxShadow: '0 25px 50px #a7c5eb'
    }}>
      <h2 className="title" style={{ color: '#0077b6' }}>💉 {breed} Vaccination Reminders</h2>

      <div style={{
        background: '#e0f7fa',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        boxShadow: 'inset 0 3px 15px #90caf9'
      }}>
        <h3 style={{ color: '#034078', marginBottom: 12 }}>Recommended Vaccines for {breed}</h3>
        <ul style={{ fontSize: 16, color: '#072f5f' }}>
          {getVaccines(breed).map((vaccine, i) => (
            <li key={i} style={{
              marginBottom: 8,
              border: '1px solid #38b4d8',
              background: i % 2 === 0 ? '#b3e5fc' : '#81d4fa',
              borderRadius: 8,
              padding: '7px 12px',
              boxShadow: '0 2px 4px #55acee'
            }}>
              ⚕️ {vaccine}
            </li>
          ))}
        </ul>
      </div>

      <button className="button" style={{
        background: 'linear-gradient(90deg, #00b4d8 30%, #0077b6 95%)',
        fontWeight: '700',
        fontSize: 18,
        padding: '11px 24px',
        borderRadius: 14,
        marginBottom: 18
      }} onClick={addReminder}>
        + Add Vaccination Reminder
      </button>

      <h3 style={{ color: '#023e8a' }}>Your Vaccination Reminders</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {reminders.length === 0 && <li style={{ color: '#5c7c8a' }}>No reminders added yet! Click above to add.</li>}
        {reminders.map((rem, i) => (
          <li key={i} style={{
            padding: '10px 15px',
            background: i % 2 === 0 ? '#caf0f8' : '#90e0ef',
            borderRadius: 12,
            marginBottom: 10,
            boxShadow: '0 1px 10px #0077b6'
          }}>
            <strong style={{ color: '#023e8a' }}>{rem.name}</strong> &nbsp; — Due: <em style={{ color: '#024f77' }}>{rem.date}</em>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 14, fontSize: 15, color: '#0077b6', textShadow: '0 0 2px #48cae4' }}>
        ✔️ Stay on time with vaccinations to keep your pet protected and healthy!
      </div>
    </div>
  );
}
