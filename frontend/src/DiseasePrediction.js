import React, { useState } from 'react';
import './App.css';

// Breed-specific common diseases and warnings
const breedRisks = {
  "Rajapalayam": {
    overview: "Prone to mange and tick infestation due to outdoor nature; requires regular skin care.",
    commonDiseases: [
      { name: "Mange", symptoms: "Hair loss, itching, scabs", advice: "Consult vet immediately for treatment" },
      { name: "Tick infestation", symptoms: "Visible ticks, itching", advice: "Use vet-approved tick prevention and removal" },
      { name: "Parvovirus", symptoms: "Vomiting, bloody diarrhea", advice: "Vaccinate and isolate infected animals" },
    ],
  },
  "Kanni": {
    overview: "Sensitive skin; digestive disorders can occur; needs proper diet and hygiene.",
    commonDiseases: [
      { name: "Skin allergies", symptoms: "Itching, redness", advice: "Use hypoallergenic shampoo and consult vet" },
      { name: "Digestive issues", symptoms: "Vomiting, loss of appetite", advice: "Adjust diet and vet checkup" },
    ],
  },
  "Golden Retriever": {
    overview: "Prone to obesity and hip joint issues; regular exercise important.",
    commonDiseases: [
      { name: "Hip Dysplasia", symptoms: "Limping, difficulty rising", advice: "Maintain healthy weight and vet monitoring" },
      { name: "Obesity", symptoms: "Weight gain, lethargy", advice: "Control diet and increase exercise" },
    ],
  },
  // Add more breeds similarly...
};

// Default overview and disease info for unknown breeds
const defaultDisease = {
  overview: "Maintain regular vet care and quarantine if symptoms persist.",
  commonDiseases: [
    { name: "Common Infectious Diseases", symptoms: "Fever, behavior change", advice: "Consult your veterinarian" }
  ],
};

export default function DiseasePrediction({ breed }) {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState(null);

  const data = breedRisks[breed] || defaultDisease;

  function checkDisease() {
    if (!symptom.trim()) {
      setResult("❗ Please enter a symptom to check.");
      return;
    }

    // Simple matching: check symptom word in symptoms list of each disease
    const lowerSym = symptom.toLowerCase();
    const matchedDiseases = data.commonDiseases.filter(disease =>
      disease.symptoms.toLowerCase().includes(lowerSym)
    );

    if (matchedDiseases.length > 0) {
      setResult(
        <>
          <p><strong>{breed} Overview:</strong> {data.overview}</p>
          <h3>Possible related condition(s):</h3>
          <ul>
            {matchedDiseases.map((dis, idx) => (
              <li key={idx} style={{ marginBottom: '12px' }}>
                <b>{dis.name}</b>: {dis.symptoms}<br />
                <i><span style={{ color: 'maroon' }}>{dis.advice}</span></i>
              </li>
            ))}
          </ul>
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            If symptoms persist or worsen, please consult a veterinarian immediately.
          </p>
        </>
      );
    } else {
      setResult(
        <>
          <p><strong>{breed} Overview:</strong> {data.overview}</p>
          <p>No direct matches found for symptom "{symptom}".</p>
          <p>Consult your vet for precise diagnosis and treatment.</p>
        </>
      );
    }
  }

  return (
    <div className="card animate__animated animate__fadeInRight" style={{ background: '#f1f8ff', borderRadius: 16, padding: '20px', boxShadow: '0 10px 40px #9bbde9' }}>
      <h2 className="title" style={{ color: '#115293' }}>{breed} Disease Prediction 🩺</h2>
      <div>
        <input
          className="input"
          type="text"
          placeholder="Describe a health symptom (e.g., itching, vomiting)"
          value={symptom}
          onChange={e => setSymptom(e.target.value)}
          style={{ maxWidth: 320, marginBottom: 14 }}
        />
        <button
          className="button"
          onClick={checkDisease}
          style={{ maxWidth: 180, fontWeight: 'bold', background: 'linear-gradient(90deg,#5078f2 40%,#a5c6ff 100%)' }}
        >
          Predict Risk
        </button>
      </div>
      <div style={{ marginTop: 18, fontSize: 16, color: '#263859', lineHeight: '1.5rem' }}>
        {result}
      </div>
      <div style={{ marginTop: 22, fontSize: 14, color: '#678', fontStyle: 'italic' }}>
        <b>Note:</b> This tool is informational and not a substitute for professional veterinary diagnosis.
      </div>
    </div>
  );
}
