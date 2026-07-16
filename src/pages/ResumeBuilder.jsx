import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ResumeBuilder() {
  const { user, setUser, token, showToast } = useContext(AuthContext);
  
  // Resume Builder States
  const [name, setName] = useState(user ? user.username : 'Priyanka Tripathi');
  const [email, setEmail] = useState(user ? user.email : 'priyanka@example.com');
  const [skills, setSkills] = useState('React, Python, SQL, REST APIs, Git, Algorithms');
  const [experience, setExperience] = useState('Frontend Intern at Google (3 months). Managed web interfaces using React.\nSDE Intern at TechCorp (6 months). Built databases schemas.');

  // ATS scanner states
  const [jobDescription, setJobDescription] = useState('We are looking for a Software Engineer proficient in React, Flask, REST APIs, SQL Database, and system architecture design.');
  const [atsScoreData, setAtsScoreData] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScanATS = (e) => {
    e.preventDefault();
    if (!token) {
      showToast('Please log in to scan ATS compatibility', 'error');
      return;
    }

    setScanning(true);
    // Combine resume fields to scan
    const resumeText = `Name: ${name}\nEmail: ${email}\nSkills: ${skills}\nExperience: ${experience}`;

    fetch('/api/resume/ats-scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription })
    })
      .then((res) => res.json())
      .then((data) => {
        setAtsScoreData(data);
        setScanning(false);
        showToast('ATS Scan completed successfully!', 'success');
        if (user) {
          setUser({ ...user, resume_score: data.match_percentage, xp: user.xp + data.xp_gained });
        }
      })
      .catch(() => {
        setScanning(false);
        showToast('ATS Scanning failed', 'error');
      });
  };

  const handleManualUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/auth/upload-resume', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
      .then((res) => {
        if (!res.ok) throw new Error('Upload error');
        return res.json();
      })
      .then((data) => {
        showToast('Resume uploaded. Score calculated!', 'success');
        if (user) {
          setUser({ ...user, resume_name: data.resume_name, resume_score: data.resume_score });
        }
      })
      .catch(() => {
        showToast('Resume upload failed', 'error');
      });
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>ATS Resume Builder & Analyzer</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Create standardized resumes and scan match rates against target job descriptions</p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1.15fr 0.85fr', alignItems: 'stretch' }}>
        
        {/* Left builder panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Standardized CV Builder</h3>
          
          <div className="grid-2">
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div>
            <label className="form-label">Skills (Comma separated)</label>
            <input type="text" className="input-field" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>

          <div>
            <label className="form-label">Professional Experience</label>
            <textarea className="input-field" rows="4" value={experience} onChange={(e) => setExperience(e.target.value)} />
          </div>

          <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.5rem' }}>ATS Match Scanner</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Target Job Description</label>
                <textarea
                  className="input-field"
                  rows="4"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={handleScanATS} disabled={scanning}>
                {scanning ? 'Scanning text keywords...' : 'Verify ATS Match Rating'}
              </button>
            </div>
          </div>
        </div>

        {/* Right ATS analytics panel */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Quick upload card */}
          <div className="glass-card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UPLOAD MANUALLY (PDF)</span>
            <input
              type="file"
              id="file-cv-upload"
              accept=".pdf,.docx"
              style={{ display: 'none' }}
              onChange={handleManualUpload}
            />
            <label htmlFor="file-cv-upload" className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', width: '100%' }}>
              📁 Choose PDF Document
            </label>
            {user?.resume_name && <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>Active: {user.resume_name}</p>}
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>ATS Scanner Results</h3>
          
          {atsScoreData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Score circular visual */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  background: 'rgba(124,58,237,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '1.4rem'
                }}>
                  {atsScoreData.match_percentage}%
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>Compatability Rating</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Score threshold: 80% needed for HR shortlists</p>
                </div>
              </div>

              {/* Missing keywords list */}
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>MISSING KNOWLEDGE KEYWORDS</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {atsScoreData.missing_keywords.map((word) => (
                    <span key={word} className="badge badge-hard" style={{ fontSize: '0.7rem' }}>
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>IMPROVEMENT CRITIQUES</span>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {atsScoreData.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Type resume variables or upload your document, then verify ATS scoring metrics.</p>
          )}

        </div>

      </div>

    </div>
  );
}
