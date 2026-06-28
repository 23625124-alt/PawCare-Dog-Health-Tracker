import React, { useState } from 'react';
import '../../App.css';

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

export default function Login({ onLogin }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!loginId.trim() || !password.trim()) {
      setError('Both fields are required!');
      return;
    }
    setError('');
    if (typeof onLogin === 'function') onLogin();
  };

  return (
    <div className="container animate__animated animate__fadeIn" style={{
      background: colors.neutral[50],
      fontFamily: typography.fontFamily
    }}>
      <div className="card animate__animated animate__bounceIn" style={{
        boxShadow: shadows.xl,
        border: `1px solid ${colors.neutral[200]}`,
        maxWidth: 480,
        textAlign: 'center',
        padding: '48px 40px',
        borderRadius: 16,
        background: '#fff'
      }}>
        {/* Professional Logo/Heading */}
        <div style={{
          marginBottom: '40px'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '16px'
          }}>
            🐾
          </div>
          <h1 style={{
            fontSize: typography.fontSize['4xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral[900],
            margin: '0 0 8px 0',
            fontFamily: typography.fontFamily
          }}>
            PawCare
          </h1>
          <p style={{
            fontSize: typography.fontSize.lg,
            color: colors.neutral[600],
            margin: 0,
            fontWeight: typography.fontWeight.medium
          }}>
            Professional Pet Care Management
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="loginId" style={{
              display: 'block',
              marginBottom: '8px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Login ID
            </label>
            <input
              id="loginId"
              className="input"
              type="text"
              placeholder="Enter your Login ID"
              value={loginId}
              onChange={e => setLoginId(e.target.value)}
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
                background: '#fff'
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

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '8px',
              color: colors.neutral[700],
              fontWeight: typography.fontWeight.semibold,
              fontSize: typography.fontSize.sm
            }}>
              Password
            </label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
                background: '#fff'
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

          {error &&
            <div className="error" style={{
              marginBottom: '24px',
              fontWeight: typography.fontWeight.medium,
              color: '#dc2626',
              fontSize: typography.fontSize.sm,
              textAlign: 'center',
              padding: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 8
            }}>
              {error}
            </div>
          }

          <button
            type="submit"
            className="button animate__animated animate__rubberBand"
            style={{
              background: colors.neutral[800],
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              height: 48,
              marginTop: 0,
              marginBottom: 0,
              width: '100%',
              borderRadius: 8,
              border: 'none',
              color: colors.white,
              cursor: 'pointer',
              boxShadow: shadows.md,
              transition: 'all 0.2s ease-in-out',
              fontFamily: typography.fontFamily
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Sign In
          </button>
        </form>
        
        <div style={{
          marginTop: '32px',
          fontSize: typography.fontSize.sm,
          color: colors.neutral[500],
          textAlign: 'center',
          padding: '16px',
          background: colors.neutral[50],
          borderRadius: 8,
          border: `1px solid ${colors.neutral[200]}`
        }}>
          <strong>Demo Mode:</strong> Use any Login ID and Password to continue
        </div>
      </div>
    </div>
  );
}
