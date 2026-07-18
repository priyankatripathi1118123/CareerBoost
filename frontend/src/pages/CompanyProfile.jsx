import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { companiesData } from '../data/companies';

export default function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const data = companiesData.find(c => c.id === id);
    if (data) setCompany(data);
  }, [id]);

  if (!company) {
    return (
      <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>Company Not Found</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/companies')} style={{ marginTop: '1rem' }}>
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <div className="page-container fade-in-section" style={{ paddingBottom: '4rem' }}>
      
      {/* Top Banner and Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/companies')}>
          &larr; Back to Companies
        </button>
        <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
          Apply Now (Official Site) &rarr;
        </a>
      </div>

      {/* Hero Banner Section */}
      <div className="glass-panel" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          background: 'white', 
          borderRadius: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '1rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
        }}>
          <img src={company.logo} alt={`${company.name} Logo`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{company.name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px', margin: '1rem auto' }}>
            {company.overview}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <span className="badge badge-medium">Salary: {company.salary}</span>
            <span className="badge badge-easy">{company.about.industry}</span>
          </div>
        </div>
      </div>

      {/* Grid Layout for details */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* About Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              🏢 About {company.name}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><strong style={{ color: 'var(--primary)' }}>History:</strong> {company.about.history}</li>
              <li><strong style={{ color: 'var(--primary)' }}>Headquarters:</strong> {company.about.headquarters}</li>
              <li><strong style={{ color: 'var(--primary)' }}>Services:</strong> {company.about.services}</li>
              <li><strong style={{ color: 'var(--primary)' }}>Global Presence:</strong> {company.about.global_presence}</li>
            </ul>
          </div>

          {/* Eligibility Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              🎓 Eligibility Criteria
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><strong style={{ color: 'var(--accent)' }}>Degrees:</strong> {company.eligibility.degrees}</li>
              <li><strong style={{ color: 'var(--accent)' }}>Academic Cutoff:</strong> {company.eligibility.criteria}</li>
              <li><strong style={{ color: 'var(--accent)' }}>Backlogs:</strong> {company.eligibility.backlogs}</li>
            </ul>
          </div>

          {/* Selection Process */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              ⚙️ Selection Process
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {company.selection_process.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'var(--primary)', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            
            <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Interview Rounds Explained</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {company.interview_rounds.map((round, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.25rem' }}>{round.round}</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{round.details}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Aptitude & Skills */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              🧩 Required Skills & Aptitude
            </h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Key Aptitude Topics</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {company.aptitude_topics.map((topic, idx) => (
                  <span key={idx} className="badge" style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--primary)' }}>{topic}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Required Technical Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {company.skills.map((skill, idx) => (
                  <span key={idx} className="badge" style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Prep Tips */}
          <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(145deg, rgba(124, 58, 237, 0.05) 0%, rgba(34, 211, 238, 0.05) 100%)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              💡 Preparation Tips
            </h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-primary)' }}>
              {company.tips.map((tip, idx) => (
                <li key={idx} style={{ lineHeight: '1.5' }}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Technical Questions */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              💻 Top 15 Technical Questions
            </h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
              {company.tech_questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>

          {/* HR Questions */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
              🤝 Top 15 HR Questions
            </h3>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
              {company.hr_questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
}
