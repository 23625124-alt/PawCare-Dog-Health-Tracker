import React from 'react';

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

export default function Dashboard({ breed, type, moduleSummaries = {}, onSelectModule }) {
  const primaryColor = colors.neutral[800];

  const leftModules = [
    { 
      id: 'dashboard', 
      label: 'Health Overview', 
      summary: moduleSummaries.dashboard || 'Monitor your pet\'s overall health status and key metrics',
      icon: '📊',
      color: colors.neutral[800]
    },
    { 
      id: 'activity', 
      label: 'Activity Tracker', 
      summary: moduleSummaries.activity || 'Track daily activities and exercise routines',
      icon: '🏃',
      color: colors.neutral[700]
    },
    { 
      id: 'diet', 
      label: 'Diet Plan', 
      summary: moduleSummaries.diet || 'Manage nutrition and meal planning',
      icon: '🍽️',
      color: colors.neutral[600]
    }
  ];

  const rightModules = [
    { 
      id: 'disease', 
      label: 'Disease Prediction', 
      summary: moduleSummaries.disease || 'Monitor symptoms and health predictions',
      icon: '🩺',
      color: colors.neutral[500]
    },
    { 
      id: 'grooming', 
      label: 'Grooming Records', 
      summary: moduleSummaries.grooming || 'Schedule and track grooming sessions',
      icon: '✂️',
      color: colors.neutral[400]
    },
    { 
      id: 'health', 
      label: 'Health Docs', 
      summary: moduleSummaries.health || 'Store and manage medical records',
      icon: '📋',
      color: colors.neutral[300]
    }
  ];

  const bottomModule = { 
    id: 'vaccine', 
    label: 'Vaccination Reminders', 
    summary: moduleSummaries.vaccine || 'Track vaccination schedules and upcoming appointments',
    icon: '💉',
    color: colors.neutral[700]
  };

  const moduleCardStyle = {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '24px',
    marginBottom: '20px',
    boxShadow: shadows.md,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    border: `1px solid ${colors.neutral[200]}`,
    position: 'relative',
    overflow: 'hidden'
  };

  const [hovered, setHovered] = React.useState(null);

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        fontFamily: typography.fontFamily,
        color: colors.neutral[800],
        padding: '24px',
      }}
    >
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        padding: '32px',
        background: '#fff',
        borderRadius: 16,
        boxShadow: shadows.lg,
        border: `1px solid ${colors.neutral[200]}`
      }}>
        <div style={{
          fontSize: '4rem',
          marginBottom: '16px'
        }}>
          🐾
        </div>
        <h1
          style={{
            color: primaryColor,
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            marginBottom: '8px',
            userSelect: 'none',
          }}
        >
          PawCare Dashboard
        </h1>
        <p style={{
          fontSize: typography.fontSize.xl,
          color: colors.neutral[600],
          margin: 0,
          fontWeight: typography.fontWeight.medium
        }}>
          Managing health for <strong>{breed}</strong> ({type.charAt(0).toUpperCase() + type.slice(1)} Breed)
        </p>
      </div>

      {/* Modules Grid */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 300px', minWidth: 300 }}>
          {leftModules.map((mod) => (
            <div
              key={mod.id}
              style={{
                ...moduleCardStyle,
                ...(hovered === mod.id ? { 
                  transform: 'translateY(-4px)', 
                  boxShadow: shadows.xl,
                  borderColor: mod.color
                } : {}),
              }}
              onClick={() => onSelectModule && onSelectModule(mod.id)}
              onMouseEnter={() => setHovered(mod.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '12px'
                }}>
                  {mod.icon}
                </div>
                <h3 style={{ 
                  fontWeight: typography.fontWeight.semibold, 
                  margin: 0, 
                  color: mod.color,
                  fontSize: typography.fontSize.lg
                }}>
                  {mod.label}
                </h3>
              </div>
              <p style={{ 
                fontSize: typography.fontSize.sm, 
                color: colors.neutral[600],
                lineHeight: '1.5',
                margin: 0
              }}>
                {mod.summary}
              </p>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: mod.color,
                opacity: hovered === mod.id ? 1 : 0.3,
                transition: 'opacity 0.2s ease-in-out'
              }} />
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 300 }}>
          {rightModules.map((mod) => (
            <div
              key={mod.id}
              style={{
                ...moduleCardStyle,
                ...(hovered === mod.id ? { 
                  transform: 'translateY(-4px)', 
                  boxShadow: shadows.xl,
                  borderColor: mod.color
                } : {}),
              }}
              onClick={() => onSelectModule && onSelectModule(mod.id)}
              onMouseEnter={() => setHovered(mod.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginRight: '12px'
                }}>
                  {mod.icon}
                </div>
                <h3 style={{ 
                  fontWeight: typography.fontWeight.semibold, 
                  margin: 0, 
                  color: mod.color,
                  fontSize: typography.fontSize.lg
                }}>
                  {mod.label}
                </h3>
              </div>
              <p style={{ 
                fontSize: typography.fontSize.sm, 
                color: colors.neutral[600],
                lineHeight: '1.5',
                margin: 0
              }}>
                {mod.summary}
              </p>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: mod.color,
                opacity: hovered === mod.id ? 1 : 0.3,
                transition: 'opacity 0.2s ease-in-out'
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Full-width Module */}
      <div
        style={{
          ...moduleCardStyle,
          maxWidth: 800,
          margin: '0 auto',
          boxShadow: shadows.lg,
          cursor: 'pointer',
          textAlign: 'center',
          ...(hovered === bottomModule.id ? { 
            transform: 'translateY(-4px)', 
            boxShadow: shadows.xl,
            borderColor: bottomModule.color
          } : {}),
        }}
        onClick={() => onSelectModule && onSelectModule(bottomModule.id)}
        onMouseEnter={() => setHovered(bottomModule.id)}
        onMouseLeave={() => setHovered(null)}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '2.5rem',
            marginRight: '16px'
          }}>
            {bottomModule.icon}
          </div>
          <h3 style={{ 
            fontWeight: typography.fontWeight.semibold, 
            margin: 0, 
            color: bottomModule.color,
            fontSize: typography.fontSize.xl
          }}>
            {bottomModule.label}
          </h3>
        </div>
        <p style={{ 
          fontSize: typography.fontSize.base, 
          color: colors.neutral[600],
          lineHeight: '1.5',
          margin: 0
        }}>
          {bottomModule.summary}
        </p>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: bottomModule.color,
          opacity: hovered === bottomModule.id ? 1 : 0.3,
          transition: 'opacity 0.2s ease-in-out'
        }} />
      </div>
    </div>
  );
}
