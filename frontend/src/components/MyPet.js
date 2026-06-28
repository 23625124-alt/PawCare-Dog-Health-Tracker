import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Professional Monochrome Design System
const colors = {
  primary: '#000000',
  secondary: '#6b7280',
  accent: '#374151',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  },
  white: '#ffffff',
  black: '#000000'
};

const typography = {
  fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
};

const API_BASE_URL = 'http://localhost:5000/api';

export default function MyPet({ userId }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    age: '',
    weight: '',
    symptoms: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    vetContact: '',
    emergencyContact: ''
  });

  useEffect(() => {
    fetchPets();
  }, [userId]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/pets/user/${userId || 'demo-user'}`);
      setPets(response.data);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pet information.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editingPet) {
        // Update existing pet
        await axios.put(`${API_BASE_URL}/pets/${editingPet._id}`, {
          ...formData,
          userId: userId || 'demo-user'
        });
      } else {
        // Add new pet
        await axios.post(`${API_BASE_URL}/pets`, {
          ...formData,
          userId: userId || 'demo-user'
        });
      }
      
      await fetchPets();
      setShowAddForm(false);
      setEditingPet(null);
      setFormData({
        petName: '',
        petType: '',
        breed: '',
        age: '',
        weight: '',
        symptoms: '',
        medicalHistory: '',
        allergies: '',
        medications: '',
        vetContact: '',
        emergencyContact: ''
      });
    } catch (err) {
      console.error('Error saving pet:', err);
      setError('Failed to save pet information.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      petName: pet.petName || '',
      petType: pet.petType || '',
      breed: pet.breed || '',
      age: pet.age || '',
      weight: pet.weight || '',
      symptoms: pet.symptoms || '',
      medicalHistory: pet.medicalHistory || '',
      allergies: pet.allergies || '',
      medications: pet.medications || '',
      vetContact: pet.vetContact || '',
      emergencyContact: pet.emergencyContact || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (petId) => {
    if (window.confirm('Are you sure you want to delete this pet profile?')) {
      try {
        await axios.delete(`${API_BASE_URL}/pets/${petId}`);
        await fetchPets();
      } catch (err) {
        console.error('Error deleting pet:', err);
        setError('Failed to delete pet profile.');
      }
    }
  };

  const PetCard = ({ pet }) => (
    <div style={{
      background: colors.white,
      borderRadius: 12,
      padding: '24px',
      boxShadow: shadows.md,
      border: `1px solid ${colors.neutral[200]}`,
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div>
          <h3 style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[900],
            margin: '0 0 4px 0'
          }}>
            {pet.petName}
          </h3>
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.neutral[600],
            margin: 0
          }}>
            {pet.breed} • {pet.petType} • {pet.age ? `${pet.age} years old` : 'Age not specified'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleEdit(pet)}
            style={{
              background: colors.neutral[100],
              color: colors.neutral[700],
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(pet._id)}
            style={{
              background: colors.neutral[100],
              color: colors.neutral[700],
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: typography.fontSize.xs,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '16px'
      }}>
        {pet.weight && (
          <div>
            <strong style={{ color: colors.neutral[700] }}>Weight:</strong> {pet.weight} kg
          </div>
        )}
        {pet.symptoms && (
          <div>
            <strong style={{ color: colors.neutral[700] }}>Symptoms:</strong> {pet.symptoms}
          </div>
        )}
        {pet.allergies && (
          <div>
            <strong style={{ color: colors.neutral[700] }}>Allergies:</strong> {pet.allergies}
          </div>
        )}
        {pet.medications && (
          <div>
            <strong style={{ color: colors.neutral[700] }}>Medications:</strong> {pet.medications}
          </div>
        )}
      </div>

      {pet.vetContact && (
        <div style={{
          background: colors.neutral[50],
          borderRadius: 8,
          padding: '12px',
          marginBottom: '8px'
        }}>
          <strong style={{ color: colors.neutral[700] }}>Vet Contact:</strong> {pet.vetContact}
        </div>
      )}

      {pet.emergencyContact && (
        <div style={{
          background: colors.neutral[50],
          borderRadius: 8,
          padding: '12px'
        }}>
          <strong style={{ color: colors.neutral[700] }}>Emergency Contact:</strong> {pet.emergencyContact}
        </div>
      )}
    </div>
  );

  const PetForm = () => (
    <div style={{
      background: colors.white,
      borderRadius: 12,
      padding: '24px',
      boxShadow: shadows.lg,
      border: `1px solid ${colors.neutral[200]}`,
      marginBottom: '20px'
    }}>
      <h3 style={{
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.neutral[900],
        marginBottom: '20px'
      }}>
        {editingPet ? 'Edit Pet Profile' : 'Add New Pet'}
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Pet Name *
            </label>
            <input
              type="text"
              value={formData.petName}
              onChange={(e) => handleInputChange('petName', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Pet Type *
            </label>
            <select
              value={formData.petType}
              onChange={(e) => handleInputChange('petType', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box',
                background: colors.white
              }}
            >
              <option value="">Select type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Breed *
            </label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => handleInputChange('breed', e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Age (years)
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '4px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Current Symptoms
          </label>
          <textarea
            value={formData.symptoms}
            onChange={(e) => handleInputChange('symptoms', e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily,
              outline: 'none',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '4px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Medical History
          </label>
          <textarea
            value={formData.medicalHistory}
            onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily,
              outline: 'none',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Allergies
            </label>
            <input
              type="text"
              value={formData.allergies}
              onChange={(e) => handleInputChange('allergies', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '4px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Medications
            </label>
            <input
              type="text"
              value={formData.medications}
              onChange={(e) => handleInputChange('medications', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 6,
                fontSize: typography.fontSize.sm,
                fontFamily: typography.fontFamily,
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '4px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Veterinarian Contact
          </label>
          <input
            type="text"
            value={formData.vetContact}
            onChange={(e) => handleInputChange('vetContact', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '4px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Emergency Contact
          </label>
          <input
            type="text"
            value={formData.emergencyContact}
            onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              fontSize: typography.fontSize.sm,
              fontFamily: typography.fontFamily,
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => {
              setShowAddForm(false);
              setEditingPet(null);
              setFormData({
                petName: '',
                petType: '',
                breed: '',
                age: '',
                weight: '',
                symptoms: '',
                medicalHistory: '',
                allergies: '',
                medications: '',
                vetContact: '',
                emergencyContact: ''
              });
            }}
            style={{
              background: colors.white,
              color: colors.neutral[700],
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 6,
              padding: '8px 16px',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: colors.neutral[800],
              color: colors.white,
              border: 'none',
              borderRadius: 6,
              padding: '8px 16px',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            {loading ? 'Saving...' : (editingPet ? 'Update Pet' : 'Add Pet')}
          </button>
        </div>
      </form>
    </div>
  );

  if (loading && pets.length === 0) {
    return (
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        fontFamily: typography.fontFamily,
        background: colors.white,
        borderRadius: 16,
        boxShadow: shadows.lg,
        border: `1px solid ${colors.neutral[200]}`,
        padding: '48px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
        <p style={{ color: colors.neutral[600] }}>Loading pet profiles...</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 1000,
      margin: '0 auto',
      fontFamily: typography.fontFamily,
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        background: colors.white,
        borderRadius: 16,
        boxShadow: shadows.lg,
        border: `1px solid ${colors.neutral[200]}`,
        padding: '32px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '16px'
        }}>
          🐾
        </div>
        <h2 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.neutral[900],
          margin: '0 0 8px 0'
        }}>
          My Pet Profiles
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          color: colors.neutral[600],
          margin: '0 0 24px 0'
        }}>
          Manage your pet's health information and medical records
        </p>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            background: colors.neutral[800],
            color: colors.white,
            border: 'none',
            borderRadius: 8,
            padding: '12px 24px',
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            boxShadow: shadows.md
          }}
        >
          + Add New Pet
        </button>
      </div>

      {error && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: 8,
          padding: '12px',
          marginBottom: '20px',
          color: '#dc2626',
          fontSize: typography.fontSize.sm
        }}>
          {error}
        </div>
      )}

      {showAddForm && <PetForm />}

      {pets.length === 0 ? (
        <div style={{
          background: colors.white,
          borderRadius: 12,
          padding: '48px',
          boxShadow: shadows.md,
          border: `1px solid ${colors.neutral[200]}`,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🐕</div>
          <h3 style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral[800],
            marginBottom: '8px'
          }}>
            No Pet Profiles Yet
          </h3>
          <p style={{
            color: colors.neutral[600],
            marginBottom: '24px'
          }}>
            Add your first pet to start tracking their health information.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              background: colors.neutral[800],
              color: colors.white,
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              boxShadow: shadows.md
            }}
          >
            Add Your First Pet
          </button>
        </div>
      ) : (
        <div>
          {pets.map(pet => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}

