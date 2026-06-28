import React, { useState } from 'react';

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

export default function UserManual({ onComplete }) {
  const [formData, setFormData] = useState({
    petName: '',
    breed: '',
    age: '',
    weight: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      // Validate required fields
      if (!formData.petName || !formData.breed) {
        setError('Please fill in Pet Name and Breed.');
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Pet data:', formData);
      onComplete(formData);
    } catch (err) {
      console.error('Error saving pet data:', err);
      setError('Failed to save pet information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 600,
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
          🐾
        </div>
        <h2 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          margin: '0 0 8px 0'
        }}>
          Dog Information Setup
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          margin: 0,
          opacity: 0.9
        }}>
          Tell us about your dog to get started
        </p>
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              required
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
              Breed *
            </label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) => handleInputChange('breed', e.target.value)}
              placeholder="Enter breed (e.g., Golden Retriever, Labrador, Rajapalayam)"
              required
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

          <button
            type="submit"
            disabled={loading}
            style={{
              background: colors.neutral[800],
              color: colors.white,
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease-in-out',
              boxShadow: shadows.md,
              fontFamily: typography.fontFamily,
              marginTop: '8px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = shadows.lg;
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = shadows.md;
            }}
          >
            {loading ? 'Setting up...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}
