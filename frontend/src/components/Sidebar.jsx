import React from 'react';

export default function Sidebar({ activePage, setActivePage, user, logout }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'jobs', label: 'Job Portal', icon: '💼' },
    { id: 'prep', label: 'Preparation Hub', icon: '🎓' },
    { id: 'playground', label: 'Coding Playground', icon: '💻' },
    { id: 'interview', label: 'AI Mock Interview', icon: '🎤' },
    { id: 'resume', label: 'Resume Builder', icon: '📄' },
    { id: 'career', label: 'AI Career Coach', icon: '🤖' },
    { id: 'companies', label: 'Companies', icon: '🏢' },
    { id: 'dsasheet', label: 'DSA Sheet', icon: '📝' },
    { id: 'interviewquestions', label: 'Interview Questions', icon: '💬' },
    { id: 'aptitude', label: 'Aptitude', icon: '🧠' },
    { id: 'codingproblems', label: 'Coding Problems', icon: '⌨️' }
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div style={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1.5rem',
        borderBottom: '1px solid var(--card-border)',
        gap: '0.75rem'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: '1rem'
        }}>
          P
        </div>
        <span style={{ fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          FutureHire AI
        </span>
      </div>

      {/* Navigation List */}
      <ul style={{ listStyle: 'none', padding: '1.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1 }}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActivePage(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1rem',
                border: 'none',
                background: activePage === item.id ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
                borderRadius: '8px',
                color: activePage === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: activePage === item.id ? 700 : 500,
                cursor: 'pointer',
                fontSize: '0.9rem',
                gap: '0.75rem',
                borderLeft: activePage === item.id ? '3px solid var(--primary)' : '3px solid transparent',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Bottom User Area */}
      {user && (
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--card-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              color: '#fff',
              fontSize: '0.85rem'
            }}>
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user.username}</h4>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user.role}</p>
            </div>
          </div>
          <button onClick={logout} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}
