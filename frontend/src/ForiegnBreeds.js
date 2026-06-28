import React from 'react';
import pomeranianImg from './image/pomerian.png';
import shihTzuImg from './image/shitzu.png';
import goldenRetrieverImg from './image/Golden Retriever.png';
import labradorRetrieverImg from './image/Labrador Retriever.png';
import huskyImg from './image/husky.png';
import bulldogImg from './image/Bulldog.png';
import germanShepherdImg from './image/German Shepherd.png';

const foreignBreedList = [
  {
    name: "Pomeranian",
    origin: "Germany/Poland",
    description: "Tiny, fluffy, and super cute; cheerful and lively companion.",
    image: pomeranianImg
  },
  {
    name: "Shih Tzu",
    origin: "China/Tibet",
    description: "Small, adorable lap dog; affectionate and perfect for families.",
    image: shihTzuImg
  },
  {
    name: "Golden Retriever",
    origin: "Scotland, UK",
    description: "Gentle and loving, famous for easy training and beauty.",
    image: goldenRetrieverImg
  },
  {
    name: "Labrador Retriever",
    origin: "UK/Canada",
    description: "World’s top family dog; playful, smart, and loving.",
    image: labradorRetrieverImg
  },
  {
    name: "Husky",
    origin: "Russia",
    description: "Striking looks, friendly, and energetic; loves chilly climates.",
    image: huskyImg
  },
  {
    name: "Bulldog",
    origin: "United Kingdom",
    description: "Muscular build, distinctive nose, and very affectionate.",
    image: bulldogImg
  },
  {
    name: "German Shepherd",
    origin: "Germany",
    description: "Strong, loyal, intelligent and popular for security work and as family pets.",
    image: germanShepherdImg
  }
];

export default function ForeignBreeds() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#3498db' }}>Foreign Breeds</h2>
      {foreignBreedList.map((breed, idx) => (
        <div
          key={breed.name}
          style={{
            border: '2px solid #3498db',
            borderRadius: '12px',
            marginBottom: '2rem',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ecf6fb'
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
            <div style={{ marginTop: '0.75rem', fontWeight: '600', color: '#3498db' }}>
              Foreign Breed
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
