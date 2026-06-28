import React, { useState } from 'react';

const breedGroomingTips = {
  "Rajapalayam": [
    "Weekly brushing with a soft brush for the short coat",
    "Monthly bath with mild dog shampoo",
    "Trim nails every 3-4 weeks",
    "Clean ears regularly and check for ticks",
    "Brush teeth weekly and wipe eyes"
  ],
  "Kanni": [
    "Brush coat weekly",
    "Bath every 4-6 weeks",
    "Trim nails monthly",
    "Clean ears every two weeks",
    "Check skin for dryness during hot months"
  ],
  "Chippiparai": [
    "Brush coat twice a week",
    "Bath every 4 weeks",
    "Regular nail trims",
    "Clean ears and eyes monthly",
    "Check paws for debris after walks"
  ],
  "Kombai": [
    "Weekly brushing to remove loose hair",
    "Bath monthly",
    "Nail trims every 3 weeks",
    "Ear and teeth cleaning biweekly",
    "Clean paws after outdoor activities"
  ],
  "Pomeranian": [
    "Daily brushing to prevent matting",
    "Bath every 3 weeks",
    "Trim coat every 2 months",
    "Regular nail and ear cleaning",
    "Professional grooming 3-4 times a year"
  ],
  // Add other breeds similarly...
};

const groomingIntervals = {
  bath: 30,
  nails: 21,
  brush: 7,
  vet: 180,
  other: 30
};

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date) {
  return date.toLocaleDateString();
}

export default function GroomingRecord({ breed }) {
  const [history, setHistory] = useState([]);
  const [nextReminders, setNextReminders] = useState({});

  function addGroomEntry() {
    const activity = prompt("Enter grooming activity (bath, nails, brush, vet, other):").toLowerCase();
    if (!activity || !groomingIntervals[activity]) {
      alert("Invalid activity. Please enter bath, nails, brush, vet, or other.");
      return;
    }
    const today = new Date();
    const nextDueDate = addDays(today, groomingIntervals[activity]);
    const newEntry = {
      activity,
      date: today,
      nextDue: nextDueDate
    };
    setHistory([newEntry, ...history]);
    setNextReminders(prev => {
      const prevDue = prev[activity];
      if (!prevDue || nextDueDate < prevDue) {
        return { ...prev, [activity]: nextDueDate };
      }
      return prev;
    });
  }

  const breedTips = breedGroomingTips[breed] || [
    "Brush coat weekly",
    "Bath monthly with mild shampoo",
    "Trim nails every 3-4 weeks",
    "Clean ears and teeth regularly"
  ];

  return (
    <div style={{
      background: '#faedf5',
      borderRadius: 15,
      padding: 20,
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      color: '#4b2a66',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: 600,
      margin: '2rem auto'
    }}>
      <h2 style={{ marginBottom: 20, color: '#9c27b0' }}>🧴 Grooming Guide & Tracker for {breed}</h2>

      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, borderBottom: '2px solid #9c27b0', paddingBottom: 5 }}>Breed Specific Grooming Tips:</h3>
        <ul style={{ lineHeight: 1.6, color: '#673ab7' }}>
          {breedTips.map((tip, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>• {tip}</li>
          ))}
        </ul>
      </section>

      <button onClick={addGroomEntry} style={{
        background: 'linear-gradient(90deg,#fd69b5 44%,#4ac1e5 90%)',
        color: '#fff',
        padding: '10px 24px',
        borderRadius: 20,
        border: 'none',
        cursor: 'pointer',
        fontWeight: '600',
        marginBottom: 25
      }}>
        + Add Grooming Entry
      </button>

      <section>
        <h3 style={{ marginBottom: 10, borderBottom: '2px solid #9c27b0', paddingBottom: 5 }}>Recent Grooming History:</h3>
        {history.length === 0 ? <p>No grooming records yet.</p> : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {history.map(({ activity, date, nextDue }, i) => (
              <li key={i} style={{
                marginBottom: 12,
                background: '#f3e5f5',
                padding: 10,
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <b style={{ textTransform: 'capitalize' }}>{activity}</b> done on <em>{formatDate(date)}</em>, next due on <em>{formatDate(nextDue)}</em>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 style={{ marginBottom: 10, borderBottom: '2px solid #9c27b0', paddingBottom: 5 }}>Upcoming Grooming Schedule:</h3>
        {Object.keys(nextReminders).length === 0 ? (
          <p>No upcoming grooming reminders. Add entries to generate reminders.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {Object.entries(nextReminders).map(([activity, date], i) => (
              <li key={i} style={{
                background: '#ede7f6',
                marginBottom: 10,
                padding: 10,
                borderRadius: 10,
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)'
              }}>
                <strong style={{ textTransform: 'capitalize' }}>{activity}</strong> is scheduled for <em>{formatDate(new Date(date))}</em>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p style={{ marginTop: 30, fontWeight: '600', color: '#7b1fa2' }}>
        Remember: Regular grooming ensures your {breed} stays comfortable, healthy, and happy!
      </p>
    </div>
  );
}
