import React from 'react';
import rajapalayamImg from './image/Rajapalayam.png';
import kanniImg from './image/kanni.png';
import chippiparaiImg from './image/chippiparai.jpg';
import kombaiImg from './image/Kombai.png';

const nativeBreedList = [
  {
    name: "Rajapalayam",
    origin: "Tamil Nadu, India",
    description: "Iconic white royal hound known for bravery, loyalty, and guard skills.",
    image: rajapalayamImg
  },
  {
    name: "Kanni",
    origin: "Tamil Nadu, India",
    description: "Swift, black-and-tan sighthound prized for speed and devotion.",
    image: kanniImg
  },
  {
    name: "Chippiparai",
    origin: "Tamil Nadu, India",
    description: "Graceful, intelligent, and known for stamina and friendly disposition.",
    image: chippiparaiImg
  },
  {
    name: "Kombai",
    origin: "Tamil Nadu, India",
    description: "Muscular, courageous, loved for loyalty and protective nature.",
    image: kombaiImg
  }
];

export default function NativeBreeds() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#d35400' }}>Native Tamil Nadu Breeds</h2>
      {nativeBreedList.map((breed, idx) => (
        <div
          key={breed.name}
          style={{
            border: '2px solid #d35400',
            borderRadius: '12px',
            marginBottom: '2rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fdf2e9'
          }}>
          <img
            src={breed.image}
            alt={breed.name}
            style={{
              width: '140px', height: '120px', borderRadius: '10px', objectFit: 'cover',
              marginRight: '1.5rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontWeight: 'bold' }}>{breed.name}</h3>
            <div style={{ fontStyle: 'italic', color: '#888', marginBottom: '0.5rem' }}>{breed.origin}</div>
            <p style={{ fontSize: '1rem', color: '#444', margin: 0 }}>{breed.description}</p>
            <div style={{ marginTop: '0.75rem', fontWeight: '600', color: '#d35400' }}>
              Native Tamil Nadu Breed
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
