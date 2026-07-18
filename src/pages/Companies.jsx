import React from 'react';

const companies = [
  { name: 'Infosys', logo: '🏢', color: '#0078D4' },
  { name: 'Microsoft', logo: 'Ⓜ️', color: '#F25022' },
  { name: 'Amazon', logo: '🅰️', color: '#FF9900' },
  { name: 'Accenture', logo: '🔼', color: '#A100FF' },
  { name: 'Google', logo: '🇬', color: '#4285F4' },
  { name: 'TCS', logo: '🇹', color: '#1A237E' },
  { name: 'Wipro', logo: '🇼', color: '#00BFA5' },
  { name: 'Cognizant', logo: '🇨', color: '#000080' },
  { name: 'Capgemini', logo: '♠️', color: '#0070AD' },
  { name: 'Deloitte', logo: '🟢', color: '#86BC25' },
];

export default function Companies() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Top Companies Hiring</h1>
        <p>Explore opportunities and interview processes of top tech giants.</p>
      </header>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {companies.map(company => (
          <div key={company.name} className="card hover-effect" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            gap: '1rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              backgroundColor: `${company.color}22`,
              color: company.color
            }}>
              {company.logo}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{company.name}</h3>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>View Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}
