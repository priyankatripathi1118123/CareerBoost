import React from 'react';
import { useNavigate } from 'react-router-dom';
import { companiesData } from '../data/companies';

export default function CompaniesList() {
  const navigate = useNavigate();

  return (
    <div className="page-container fade-in-section">
      <header className="page-header">
        <h1>Top Companies Hiring</h1>
        <p>Explore opportunities, interview processes, and preparation materials for top tech giants.</p>
      </header>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {companiesData.map(company => (
          <div key={company.id} className="card hover-effect" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2.5rem 1.5rem',
            gap: '1.25rem',
            textAlign: 'center',
            background: 'var(--card-bg)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <img src={company.logo} alt={company.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{company.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{company.about.industry}</p>
            </div>
            
            <button 
              className="btn btn-primary btn-sm" 
              style={{ width: '100%', marginTop: 'auto' }}
              onClick={() => navigate(`/companies/${company.id}`)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
