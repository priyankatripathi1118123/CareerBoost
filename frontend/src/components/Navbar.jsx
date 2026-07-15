import React, { useState } from 'react';

export default function Navbar({ user, theme, toggleTheme }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Resume successfully analyzed by ATS checker", time: "10m ago" },
    { id: 2, text: "Google posted a new Frontend Developer position!", time: "1h ago" },
    { id: 3, text: "Your daily coding streak is at risk! Solve 1 question.", time: "4h ago" }
  ]);

  return (
    <nav className="navbar">
      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', width: '320px' }}>
        <span style={{ position: 'absolute', left: '0.85rem', color: 'var(--text-muted)' }}>🔍</span>
        <input
          type="text"
          className="input-field"
          placeholder="Search lessons, coding problems, jobs..."
          style={{ paddingLeft: '2.25rem', height: '36px' }}
          disabled
        />
      </div>

      {/* Navigation Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        
        {/* User Stats chips */}
        {user && (
          <div className="responsive-hide" style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{
              background: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              padding: '0.35rem 0.75rem',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--primary)'
            }}>
              ⚡ {user.xp} XP
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              padding: '0.35rem 0.75rem',
              borderRadius: '99px',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--warning)'
            }}>
              🔥 {user.streak} Days
            </div>
          </div>
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? "☀️" : "🌙"}
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.25rem'
            }}
          >
            🔔
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              background: 'var(--danger)',
              borderRadius: '50%'
            }}></span>
          </button>

          {/* Notification Dropdown Drawer */}
          {showNotifications && (
            <div className="glass-panel" style={{
              position: 'absolute',
              top: '40px',
              right: '0',
              width: '320px',
              padding: '1rem',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>Notifications</span>
                <button
                  onClick={() => setShowNotifications(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  Close
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notifications.map((notif) => (
                  <div key={notif.id} style={{ fontSize: '0.8rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <p style={{ color: 'var(--text-primary)', lineHeight: '1.3' }}>{notif.text}</p>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px', display: 'block' }}>{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
