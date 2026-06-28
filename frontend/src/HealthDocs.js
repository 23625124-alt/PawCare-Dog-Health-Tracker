import React, { useState } from 'react';
import './App.css';

const defaultHealthTips = [
  "Keep regular vet visits at least twice a year.",
  "Maintain updated vaccination schedule.",
  "Monitor for any abnormal behavior or symptoms.",
  "Give deworming medication as prescribed by vet.",
  "Track weight and diet changes carefully.",
  "Keep dental hygiene up with regular teeth brushing.",
  "Record any allergies or reactions to food/medicine."
];

export default function HealthDocs({ breed }) {
  const [records, setRecords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formInput, setFormInput] = useState({
    type: '',
    date: '',
    notes: ''
  });

  // Handle form change
  function handleChange(e) {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  }

  // Add new record
  function addRecord(e) {
    e.preventDefault();
    if (!formInput.type || !formInput.date) {
      alert("Please enter record type and date.");
      return;
    }
    setRecords([{ ...formInput }, ...records]);
    setShowAddForm(false);
    setFormInput({ type: '', date: '', notes: '' });
  }

  return (
    <div className="card animate__animated animate__fadeInUp" style={{ background: '#fef9f7', border: '2px solid #f5c7a9', boxShadow: '0 10px 30px #f5e0cf' }}>
      <h2 className="title" style={{ color: '#e76f51' }}>📋 Health Records for {breed}</h2>

      {/* Default Tips */}
      <div style={{
        background: '#ffefdb',
        padding: '15px 20px',
        borderRadius: '15px',
        boxShadow: 'inset 0 5px 12px #fae8d1',
        marginBottom: '20px',
        fontSize: '1rem',
        color: '#9d4edd'
      }}>
        <h3 style={{ marginBottom: '10px' }}>Health Care Tips</h3>
        <ul style={{paddingLeft: '1.2rem'}}>
          {defaultHealthTips.map((tip, i) => (
            <li key={i} style={{ marginBottom: '6px' }}>
              🩺 {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Add new record button and form */}
      {!showAddForm ? (
        <button className="button" style={{ background: '#e76f51', fontWeight: 'bold', marginBottom: '18px' }} onClick={() => setShowAddForm(true)}>
          + Add New Health Record
        </button>
      ) : (
        <form onSubmit={addRecord} style={{ marginBottom: '20px', background: '#fff4ee', padding: '15px', borderRadius: '15px', boxShadow: '0 4px 12px #fcdac7' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Record Type <sup style={{color: 'red'}}>*</sup></label>
            <input type="text" name="type" required
              placeholder="Vet Visit, Vaccination, Medication..."
              value={formInput.type}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Date <sup style={{color: 'red'}}>*</sup></label>
            <input type="date" name="date" required
              value={formInput.date}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Notes</label>
            <textarea name="notes" rows="3"
              placeholder="Additional details..."
              value={formInput.notes}
              onChange={handleChange}
              className="input"
              style={{resize: 'vertical'}}
            />
          </div>
          <button type="submit" className="button" style={{ background: '#f4a261', marginRight: '12px' }}>Save Record</button>
          <button type="button" className="button" style={{ background: '#888', fontWeight: 'normal' }} onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
      )}

      {/* Records List */}
      <div>
        <h3 style={{ color: '#bb5601', marginBottom: '14px' }}>Saved Health Records</h3>
        {records.length === 0 ? (
          <p style={{ color: '#c9a66b' }}>No records saved yet. Use the button above to add health records.</p>
        ) : (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {records.map((rec, idx) => (
              <li key={idx} style={{
                background: '#ffe2c7',
                marginBottom: '12px',
                padding: '12px 18px',
                borderRadius: '12px',
                boxShadow: '0 3px 15px #fad6b3',
                fontSize: '1rem',
                color: '#833a0f'
              }}>
                <strong>{rec.type}</strong> &nbsp; 
                <span style={{ color: '#d96920' }}>{new Date(rec.date).toLocaleDateString()}</span>
                {rec.notes && <p style={{ marginTop: '6px', fontStyle: 'italic', color: '#af7d57' }}>{rec.notes}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
