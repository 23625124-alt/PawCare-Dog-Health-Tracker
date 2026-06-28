import React, { useState, useEffect } from 'react';

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

export default function MyPet({ userId, userPetData }) {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPetData = () => {
      if (userPetData) {
        setPet(userPetData);
        setLoading(false);
        return;
      }

      // Try to get from localStorage first
      const savedPetData = localStorage.getItem('userPetData');
      if (savedPetData) {
        try {
          const parsedData = JSON.parse(savedPetData);
          setPet(parsedData);
          setLoading(false);
          return;
        } catch (err) {
          console.error('Error parsing saved pet data:', err);
        }
      }

      setError('No pet data found. Please complete the pet setup first.');
      setLoading(false);
    };

    fetchPetData();
  }, [userId, userPetData]);

  if (loading) {
    return (
      <div style={{
        maxWidth: 600,
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
        <h2 style={{ color: colors.neutral[800] }}>Loading Pet Profile...</h2>
        <p style={{ color: colors.neutral[500] }}>Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        fontFamily: typography.fontFamily,
        background: colors.white,
        borderRadius: 16,
        boxShadow: shadows.lg,
        border: `1px solid ${colors.neutral[200]}`,
        padding: '48px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: colors.neutral[800] }}>No Pet Data Found</h2>
        <p style={{ color: colors.neutral[600] }}>{error}</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        fontFamily: typography.fontFamily,
        background: colors.white,
        borderRadius: 16,
        boxShadow: shadows.lg,
        border: `1px solid ${colors.neutral[200]}`,
        padding: '48px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🐕</div>
        <h2 style={{ color: colors.neutral[800] }}>No Pet Registered</h2>
        <p style={{ color: colors.neutral[500] }}>Please complete the pet setup to view your pet's information.</p>
      </div>
    );
  }

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
          My Dog Profile
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          margin: 0,
          opacity: 0.9
        }}>
          Your dog's information and health details
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          fontSize: typography.fontSize.base,
          color: colors.neutral[700]
        }}>
          <div style={{
            background: colors.neutral[50],
            padding: '20px',
            borderRadius: 12,
            border: `1px solid ${colors.neutral[200]}`
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '1.5rem', marginRight: '12px' }}>🐕</span>
              <h3 style={{
                margin: 0,
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral[900]
              }}>
                {pet.petName}
              </h3>
            </div>
            <p style={{
              margin: '0 0 8px 0',
              fontSize: typography.fontSize.lg,
              color: colors.neutral[600]
            }}>
              {pet.breed} • Dog
            </p>
            {pet.age && (
              <p style={{
                margin: '0 0 8px 0',
                fontSize: typography.fontSize.base,
                color: colors.neutral[600]
              }}>
                Age: {pet.age} years old
              </p>
            )}
            {pet.weight && (
              <p style={{
                margin: 0,
                fontSize: typography.fontSize.base,
                color: colors.neutral[600]
              }}>
                Weight: {pet.weight} kg
              </p>
            )}
          </div>

          <div style={{
            background: colors.neutral[50],
            padding: '20px',
            borderRadius: 12,
            border: `1px solid ${colors.neutral[200]}`
          }}>
            <h4 style={{
              margin: '0 0 12px 0',
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral[800]
            }}>
              Breed Information
            </h4>
            <p style={{
              margin: '0 0 8px 0',
              fontSize: typography.fontSize.base,
              color: colors.neutral[700]
            }}>
              <strong>Breed:</strong> {pet.breed}
            </p>
            <p style={{
              margin: '0 0 8px 0',
              fontSize: typography.fontSize.base,
              color: colors.neutral[700]
            }}>
              <strong>Type:</strong> Dog
            </p>
            {pet.timestamp && (
              <p style={{
                margin: 0,
                fontSize: typography.fontSize.sm,
                color: colors.neutral[500]
              }}>
                Profile created: {new Date(pet.timestamp).toLocaleDateString()}
              </p>
            )}
          </div>

          <div style={{
            background: colors.neutral[50],
            padding: '20px',
            borderRadius: 12,
            border: `1px solid ${colors.neutral[200]}`
          }}>
            <h4 style={{
              margin: '0 0 12px 0',
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral[800]
            }}>
              Health Summary
            </h4>
            <p style={{
              margin: 0,
              fontSize: typography.fontSize.base,
              color: colors.neutral[700]
            }}>
              This is your dog's primary profile. You can manage other aspects of their care through the various modules available in PawCare.
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '32px',
          padding: '20px',
          background: colors.neutral[100],
          borderRadius: 12,
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: typography.fontSize.sm,
            color: colors.neutral[600]
          }}>
            💡 <strong>Tip:</strong> Use the other modules to track activities, diet, grooming, and health records for {pet.petName}.
          </p>
        </div>
      </div>
    </div>
  );
}


