import React, { useState } from 'react';
import './App.css';

const nativeBreeds = [
  { name: 'Rajapalayam', origin: 'Tamil Nadu', description: 'Iconic royal hound.' },
  { name: 'Kanni', origin: 'Tamil Nadu', description: 'Swift sighthound.' },
  { name: 'Chippiparai', origin: 'Tamil Nadu', description: 'Graceful, intelligent.' },
  { name: 'Kombai', origin: 'Tamil Nadu', description: 'Muscular, loyal.' }
];

const foreignBreeds = [
  { name: 'Pomeranian', origin: 'Germany/Poland', description: 'Tiny, fluffy, lively.' },
  { name: 'Shih Tzu', origin: 'China/Tibet', description: 'Cute lap dog.' },
  { name: 'Golden Retriever', origin: 'Scotland, UK', description: 'Gentle, loving.' },
  { name: 'Labrador Retriever', origin: 'UK/Canada', description: 'World’s top family dog.' },
  { name: 'Husky', origin: 'Russia', description: 'Striking, friendly.' },
  { name: 'Bulldog', origin: 'United Kingdom', description: 'Muscular, brave.' }
];

export default function BreedSelect({ onSelect }) {
  const [type, setType] = useState(null);

  if (!type)
    return (
      <div className="container animate__animated animate__fadeIn">
        <div className="card" style={{maxWidth:420}}>
          <h2 className="title">Choose Breed Type</h2>
          <button className="button" style={{marginBottom:18}} onClick={() => setType('native')}>🐕 Native Breeds</button>
          <button className="button" onClick={() => setType('foreign')}>🐶 Foreign Breeds</button>
        </div>
      </div>
    );

  const breeds = type === 'native' ? nativeBreeds : foreignBreeds;

  return (
    <div style={{padding: '2rem', minHeight: '100vh', background: type==='native'?'#fdf2e9':'#ecf6fb'}}>
      <h2 style={{marginBottom: '1.5rem', color: type==='native'?'#d35400':'#2c3e50'}}>
        {type === 'native' ? "Native Breeds" : "Foreign Breeds"}
      </h2>
      <div style={{display:'flex',flexWrap:'wrap',gap:22}}>
        {breeds.map((breed) => (
          <div
            key={breed.name}
            className="card animate__animated animate__fadeInUp"
            style={{
              minWidth:220,
              border:'2px solid', borderColor:type==='native'?'#d35400':'#3498db',
              borderRadius:'12px', marginBottom:'2rem', padding:'1.2rem',
              backgroundColor:type==='native'?'#fff7f0':'#f6fbfe',cursor:'pointer'
            }}
            onClick={() => onSelect({ name: breed.name, type })}
          >
            <h3 style={{margin:'0 0 0.5rem 0', color:'#2c3e50', fontWeight:'bold', fontSize:24}}>
              {breed.name}
            </h3>
            <div style={{color:'#888', fontStyle:'italic', marginBottom:'.5rem'}}>{breed.origin}</div>
            <p style={{fontSize:'1rem', color:'#444', margin:0}}>{breed.description}</p>
          </div>
        ))}
      </div>
      <button className="button" style={{marginTop:12}} onClick={() => setType(null)}>← Back</button>
    </div>
  );
}
