import React, { useState } from 'react';
import './App.css';

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

// Breed-based recommended activities
const breedActivities = {
  "Rajapalayam": [
    "Morning walk (30 min)",
    "Chasing ball/play in yard",
    "Short sprint or run",
    "Basic commands practice"
  ],
  "Kanni": [
    "Jog or run (20-30 min)",
    "Agility games (jump, fetch)",
    "Play with toys (chew/rope)"
  ],
  "Chippiparai": [
    "Brisk walk (20 min)",
    "Scent/finding games",
    "Free run in safe open space"
  ],
  "Kombai": [
    "Structured walk (30 min)",
    "Pull/strength game (tug)",
    "Hide and seek at home"
  ],
  "Pomeranian": [
    "Short walk (15 min)",
    "Indoor fetch",
    "Learning new trick",
    "Play with puzzle toy"
  ],
  "Shih Tzu": [
    "Walk (20 min)",
    "Gentle play with soft toy",
    "Grooming/relax session"
  ],
  "Golden Retriever": [
    "Long walk (45 min)",
    "Swim or splash play",
    "Training session (obedience)"
  ],
  "Labrador Retriever": [
    "Active walk/jog (30-40 min)",
    "Fetch game outdoors",
    "Social play with other dogs"
  ],
  "Husky": [
    "Vigorous run/jog (30-45 min)",
    "Mental games (puzzle feeder)",
    "Short tug-of-war"
  ],
  "Bulldog": [
    "Gentle walk (10-15 min)",
    "Indoor retrieve game",
    "Rest/short play indoors"
  ]
};

function getActivities(breed) {
  return breedActivities[breed] || [
    "Walk (20-30 min)",
    "Playtime with toys",
    "Basic command training"
  ];
}

// Helper: Get today's date as string
function todayStr() {
  return new Date().toLocaleDateString();
}

export default function ActivityUpdate({ breed }) {
  const activities = getActivities(breed);
  const [today, setToday] = useState(todayStr());
  const [checked, setChecked] = useState(Array(activities.length).fill(false));
  const [history, setHistory] = useState([]);

  // When user ticks an activity
  function toggle(i) {
    const updated = checked.map((val, idx) => idx === i ? !val : val);
    setChecked(updated);
  }

  // On "Save Today's Activity"
  function saveDay() {
    const completed = activities.filter((_, i) => checked[i]);
    setHistory([{date: today, completed}, ...history]);
    setChecked(Array(activities.length).fill(false));
    setToday(todayStr()); // Refresh date in case
  }

  // When user changes the day (if you want to allow daily review)
  function resetDay() {
    setChecked(Array(activities.length).fill(false));
    setToday(todayStr());
  }

  return (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      fontFamily: typography.fontFamily,
      background: '#fff',
      borderRadius: 16,
      boxShadow: shadows.lg,
      border: `1px solid ${colors.neutral[200]}`,
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.primary} 100%)`,
        padding: '32px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '16px'
        }}>
          🏃‍♂️
        </div>
        <h2 style={{
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          margin: '0 0 8px 0'
        }}>
          Daily Activity Tracker
        </h2>
        <p style={{
          fontSize: typography.fontSize.lg,
          margin: 0,
          opacity: 0.9
        }}>
          {breed} • {today}
        </p>
      </div>

      {/* Content */}
      <div style={{ padding: '32px' }}>
        {/* Activities Section */}
        <div style={{
          background: colors.neutral[50],
          borderRadius: 12,
          padding: '24px',
          marginBottom: '32px',
          border: `1px solid ${colors.neutral[200]}`
        }}>
          <h3 style={{
            color: colors.accent,
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.xl,
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            🐕 Recommended Activities
          </h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {activities.map((act, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                background: checked[i] ? colors.success + '15' : '#fff',
                borderRadius: 8,
                border: `1px solid ${checked[i] ? colors.success : colors.neutral[200]}`,
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer'
              }}
              onClick={() => toggle(i)}
              >
                <input 
                  type="checkbox" 
                  checked={checked[i]} 
                  onChange={() => toggle(i)}
                  style={{
                    marginRight: '16px',
                    width: '18px',
                    height: '18px',
                    accentColor: colors.accent
                  }}
                />
                <span style={{
                  color: checked[i] ? colors.success : colors.neutral[700],
                  fontWeight: checked[i] ? typography.fontWeight.semibold : typography.fontWeight.medium,
                  fontSize: typography.fontSize.base,
                  flex: 1
                }}>
                  {act}
                </span>
                {checked[i] && (
                  <span style={{
                    color: colors.success,
                    fontSize: typography.fontSize.lg
                  }}>
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={saveDay}
              disabled={checked.every(v => !v)}
              style={{
                background: colors.accent,
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                cursor: checked.every(v => !v) ? 'not-allowed' : 'pointer',
                opacity: checked.every(v => !v) ? 0.5 : 1,
                transition: 'all 0.2s ease-in-out',
                boxShadow: shadows.sm
              }}
              onMouseEnter={(e) => {
                if (!checked.every(v => !v)) {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = shadows.md;
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = shadows.sm;
              }}
            >
              Save Today's Activity
            </button>
            <button 
              onClick={resetDay}
              style={{
                background: '#fff',
                color: colors.neutral[700],
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 8,
                padding: '12px 24px',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                boxShadow: shadows.sm
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.neutral[50];
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#fff';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Reset Day
            </button>
          </div>
        </div>

        {/* Activity Log Section */}
        <div style={{
          background: colors.neutral[50],
          borderRadius: 12,
          padding: '24px',
          border: `1px solid ${colors.neutral[200]}`
        }}>
          <h3 style={{
            color: colors.primary,
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.xl,
            margin: '0 0 20px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📊 Activity History
          </h3>
          
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {history.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '32px',
                color: colors.neutral[500],
                fontSize: typography.fontSize.base
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📝</div>
                No activity records yet for {breed}.
                <br />
                Complete some activities and save them to see your progress!
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {history.map((record, idx) => (
                  <div key={idx} style={{
                    background: '#fff',
                    borderRadius: 8,
                    padding: '16px',
                    border: `1px solid ${colors.neutral[200]}`,
                    boxShadow: shadows.sm
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        color: colors.primary,
                        fontWeight: typography.fontWeight.semibold,
                        fontSize: typography.fontSize.base
                      }}>
                        {record.date}
                      </span>
                      <span style={{
                        marginLeft: '8px',
                        color: colors.neutral[500],
                        fontSize: typography.fontSize.sm
                      }}>
                        ({record.completed.length} activities completed)
                      </span>
                    </div>
                    <div style={{
                      color: colors.success,
                      fontSize: typography.fontSize.sm,
                      lineHeight: '1.5'
                    }}>
                      {record.completed.length === 0 ? (
                        <span style={{ color: colors.neutral[500], fontStyle: 'italic' }}>
                          No activities completed this day
                        </span>
                      ) : (
                        record.completed.map((activity, i) => (
                          <span key={i} style={{
                            display: 'inline-block',
                            marginRight: '8px',
                            marginBottom: '4px'
                          }}>
                            ✓ {activity}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Message */}
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '16px',
          background: colors.accent + '10',
          borderRadius: 8,
          border: `1px solid ${colors.accent}30`
        }}>
          <p style={{
            color: colors.accent,
            fontSize: typography.fontSize.sm,
            margin: 0,
            fontWeight: typography.fontWeight.medium
          }}>
            💡 Regular activity helps keep your {breed} healthy, happy, and well-exercised!
          </p>
        </div>
      </div>
    </div>
  );
}
