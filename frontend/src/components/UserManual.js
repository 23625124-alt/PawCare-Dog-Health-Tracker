import React, { useState } from 'react';
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

export default function UserManual({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    
    try {
      // For now, just store locally and proceed
      // In production, you would save to backend
      console.log('Pet data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onComplete(formData);
    } catch (err) {
      console.error('Error saving pet data:', err);
      setError('Failed to save pet information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div>
      <h3 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.neutral[900],
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Basic Pet Information
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
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
            placeholder="Enter your pet's name"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.neutral[600];
              e.target.style.boxShadow = `0 0 0 3px ${colors.neutral[200]}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.neutral[300];
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Pet Type *
          </label>
          <select
            value={formData.petType}
            onChange={(e) => handleInputChange('petType', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
              background: colors.white
            }}
          >
            <option value="">Select pet type</option>
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
            marginBottom: '8px',
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
            placeholder="Enter breed (e.g., Golden Retriever, Persian Cat)"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
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
              placeholder="Age"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 8,
                fontSize: typography.fontSize.base,
                fontFamily: typography.fontFamily,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
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
              placeholder="Weight"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 8,
                fontSize: typography.fontSize.base,
                fontFamily: typography.fontFamily,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h3 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.neutral[900],
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Health Information
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Current Symptoms
          </label>
          <textarea
            value={formData.symptoms}
            onChange={(e) => handleInputChange('symptoms', e.target.value)}
            placeholder="Describe any current symptoms or health concerns..."
            rows={4}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Medical History
          </label>
          <textarea
            value={formData.medicalHistory}
            onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
            placeholder="Previous illnesses, surgeries, or medical conditions..."
            rows={4}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Known Allergies
          </label>
          <input
            type="text"
            value={formData.allergies}
            onChange={(e) => handleInputChange('allergies', e.target.value)}
            placeholder="Food allergies, medication allergies, etc."
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h3 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.neutral[900],
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Medications & Contacts
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: colors.neutral[700],
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.sm
          }}>
            Current Medications
          </label>
          <textarea
            value={formData.medications}
            onChange={(e) => handleInputChange('medications', e.target.value)}
            placeholder="List current medications, dosages, and frequency..."
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
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
            placeholder="Vet name, clinic, phone number"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
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
            placeholder="Emergency contact person and phone number"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div>
      <h3 style={{
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.neutral[900],
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Review & Complete
      </h3>
      
      <div style={{
        background: colors.neutral[50],
        borderRadius: 12,
        padding: '24px',
        border: `1px solid ${colors.neutral[200]}`
      }}>
        <h4 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral[800],
          marginBottom: '16px'
        }}>
          Pet Information Summary
        </h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div><strong>Name:</strong> {formData.petName || 'Not provided'}</div>
          <div><strong>Type:</strong> {formData.petType || 'Not provided'}</div>
          <div><strong>Breed:</strong> {formData.breed || 'Not provided'}</div>
          <div><strong>Age:</strong> {formData.age ? `${formData.age} years` : 'Not provided'}</div>
          <div><strong>Weight:</strong> {formData.weight ? `${formData.weight} kg` : 'Not provided'}</div>
          <div><strong>Symptoms:</strong> {formData.symptoms || 'None reported'}</div>
          <div><strong>Allergies:</strong> {formData.allergies || 'None reported'}</div>
          <div><strong>Medications:</strong> {formData.medications || 'None'}</div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      fontFamily: typography.fontFamily,
      background: colors.white,
      borderRadius: 16,
      boxShadow: shadows.lg,
      border: `1px solid ${colors.neutral[200]}`,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: colors.neutral[900],
        padding: '32px',
        textAlign: 'center',
        color: colors.white
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '16px'
        }}>
          📋
        </div>
        <h2 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          margin: '0 0 8px 0'
        }}>
          Pet Information Manual
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          margin: 0,
          opacity: 0.9
        }}>
          Step {currentStep} of 4
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{
        padding: '16px 32px',
        background: colors.neutral[100]
      }}>
        <div style={{
          width: '100%',
          height: '8px',
          background: colors.neutral[200],
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(currentStep / 4) * 100}%`,
            height: '100%',
            background: colors.neutral[800],
            transition: 'width 0.3s ease-in-out'
          }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            padding: '12px',
            marginBottom: '24px',
            color: '#dc2626',
            fontSize: typography.fontSize.sm
          }}>
            {error}
          </div>
        )}

        {renderStepContent()}

        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '32px',
          gap: '16px'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            style={{
              background: colors.white,
              color: colors.neutral[700],
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.medium,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
              opacity: currentStep === 1 ? 0.5 : 1,
              transition: 'all 0.2s ease-in-out',
              boxShadow: shadows.sm
            }}
          >
            ← Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={!formData.petName || !formData.petType || !formData.breed}
              style={{
                background: colors.neutral[800],
                color: colors.white,
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                cursor: (!formData.petName || !formData.petType || !formData.breed) ? 'not-allowed' : 'pointer',
                opacity: (!formData.petName || !formData.petType || !formData.breed) ? 0.5 : 1,
                transition: 'all 0.2s ease-in-out',
                boxShadow: shadows.md
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: colors.neutral[900],
                color: colors.white,
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease-in-out',
                boxShadow: shadows.md
              }}
            >
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
