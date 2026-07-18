import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function JobPortal() {
  const { token, showToast } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('explore'); // explore, saved, applied
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, Full-time, Internship
  
  const [savedIds, setSavedIds] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Apply drawer state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  // Fetch Jobs
  const fetchJobs = () => {
    setLoading(true);
    let url = `/api/jobs/?category=${filterType === 'All' ? '' : filterType}&query=${searchQuery}&location=${filterLocation}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
        if (data.length > 0 && !selectedJob) {
          setSelectedJob(data[0]);
        }
      })
      .catch(() => {
        showToast('Error loading job listings', 'error');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, filterLocation, filterType]);

  // Fetch bookmarks & applications if token is present
  useEffect(() => {
    if (token) {
      // Saved/Bookmarked
      fetch('/api/jobs/saved', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          setSavedIds(data.map((item) => item.job.id));
        });

      // Applied
      fetch('/api/jobs/applications', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => res.json())
        .then((data) => {
          setAppliedJobs(data);
        });
    }
  }, [token, activeTab]);

  const handleSaveToggle = (jobId) => {
    if (!token) {
      showToast('Please log in to save jobs', 'error');
      return;
    }
    fetch(`/api/jobs/save/${jobId}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.saved) {
          setSavedIds([...savedIds, jobId]);
          showToast('Job saved to bookmarks', 'success');
        } else {
          setSavedIds(savedIds.filter((id) => id !== jobId));
          showToast('Job removed from bookmarks', 'info');
        }
      });
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!token) {
      showToast('Please log in to apply', 'error');
      return;
    }
    
    fetch(`/api/jobs/apply/${selectedJob.id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Already applied to this opening');
        return res.json();
      })
      .then((data) => {
        showToast(`Successfully applied to ${selectedJob.company}!`, 'success');
        setShowApplyModal(false);
        setResumeFile(null);
        // Refresh applied listings
        setAppliedJobs([data.application, ...appliedJobs]);
      })
      .catch((err) => {
        showToast(err.message, 'error');
        setShowApplyModal(false);
      });
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Subnav Toggles */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--card-border)', gap: '1rem' }}>
        <button
          onClick={() => setActiveTab('explore')}
          className="btn btn-sm"
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'explore' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'explore' ? '2px solid var(--accent)' : 'none',
            borderRadius: 0,
            padding: '0.75rem 1rem'
          }}
        >
          🔍 Explore Listings
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className="btn btn-sm"
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'saved' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'saved' ? '2px solid var(--accent)' : 'none',
            borderRadius: 0,
            padding: '0.75rem 1rem'
          }}
        >
          🔖 Saved Openings ({savedIds.length})
        </button>
        <button
          onClick={() => setActiveTab('applied')}
          className="btn btn-sm"
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'applied' ? 'var(--accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'applied' ? '2px solid var(--accent)' : 'none',
            borderRadius: 0,
            padding: '0.75rem 1rem'
          }}
        >
          📋 Track Applications ({appliedJobs.length})
        </button>
      </div>

      {activeTab === 'explore' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Filters */}
          <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Search by title, role, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div style={{ width: '200px' }}>
              <input
                type="text"
                className="input-field"
                placeholder="Location (e.g. Bangalore)"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
            <div>
              <select className="input-field" style={{ paddingRight: '2rem' }} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All Categories</option>
                <option value="Full-time">Full-time Roles</option>
                <option value="Internship">Internships Only</option>
              </select>
            </div>
          </div>

          {/* Core Split Board */}
          <div className="grid-2" style={{ gridTemplateColumns: '0.9fr 1.1fr', alignItems: 'stretch' }}>
            
            {/* Left Card list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '600px', paddingRight: '5px' }}>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="glass-card skeleton" style={{ height: '110px' }}></div>
                ))
              ) : jobs.length === 0 ? (
                <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No job openings match your query criteria.
                </div>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="glass-panel"
                    style={{
                      padding: '1.25rem',
                      cursor: 'pointer',
                      borderLeft: selectedJob?.id === job.id ? '4px solid var(--accent)' : '1px solid var(--card-border)',
                      background: selectedJob?.id === job.id ? 'rgba(6, 182, 212, 0.04)' : 'var(--card-bg)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{job.title}</h4>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleSaveToggle(job.id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
                      >
                        {savedIds.includes(job.id) ? '❤️' : '🖤'}
                      </button>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.75rem' }}>{job.company}</p>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <span>📍 {job.location}</span>
                      <span>💰 {job.salary}</span>
                      <span className={`badge ${job.type === 'Internship' ? 'badge-easy' : 'badge-medium'}`}>{job.type}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Job Details */}
            <div className="glass-panel" style={{ padding: '2rem', overflowY: 'auto', maxHeight: '600px' }}>
              {selectedJob ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{selectedJob.title}</h2>
                      <span style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 700 }}>{selectedJob.company}</span>
                    </div>
                    <button className="btn btn-primary" onClick={() => setShowApplyModal(true)}>
                      Apply Now
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Location:</span> <strong>{selectedJob.location}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Type:</span> <strong>{selectedJob.type}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Experience:</span> <strong>{selectedJob.experience}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Salary Bracket:</span> <strong>{selectedJob.salary}</strong></div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Job Description</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Requirements</h3>
                    <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Select a job opening to view details
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>Saved Job Bookmarks</h2>
          {savedIds.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You have not bookmarked any job postings yet.</p>
          ) : (
            <div className="grid-2">
              {jobs.filter((j) => savedIds.includes(j.id)).map((job) => (
                <div key={job.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{job.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{job.company}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>📍 {job.location} • {job.salary}</p>
                  <button className="btn btn-secondary btn-sm" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }} onClick={() => { setSelectedJob(job); setActiveTab('explore'); }}>
                    View & Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'applied' && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>Application Progress Logs</h2>
          {appliedJobs.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>You haven't submitted any applications through CareerBoost AI yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appliedJobs.map((app) => (
                <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{app.job_title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{app.company} • Resume: {app.resume_name}</p>
                  </div>
                  
                  {/* Pipeline state badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }} className="responsive-hide">
                      {['Applied', 'Review', 'Interview', 'Offer'].map((stg) => {
                        const stages = ['Applied', 'Review', 'Interview', 'Offer'];
                        const currentIdx = stages.indexOf(app.status);
                        const idx = stages.indexOf(stg);
                        const isPast = idx <= currentIdx;
                        return (
                          <div key={stg} style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: isPast ? 'var(--success)' : 'rgba(255,255,255,0.1)',
                            boxShadow: isPast && stg === app.status ? '0 0 8px var(--success)' : 'none'
                          }}></div>
                        );
                      })}
                    </div>
                    <span className={`badge ${app.status === 'Interview' ? 'badge-medium' : app.status === 'Offer' ? 'badge-easy' : 'badge-hard'}`} style={{ padding: '0.35rem 0.75rem' }}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* QUICK APPLY MODEL */}
      {showApplyModal && selectedJob && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 300
        }}>
          <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Quick Apply Form</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Submit candidacy to {selectedJob.company} for {selectedJob.title}</p>
            </div>

            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="form-label">Attached CV Document</label>
                <div
                  onClick={() => setResumeFile({ name: 'Priyanka_Tripathi_Resume.pdf' })}
                  style={{
                    border: '2px dashed var(--card-border)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.01)'
                  }}
                >
                  {resumeFile ? (
                    <span style={{ color: 'var(--success)', fontWeight: 600 }}>📄 {resumeFile.name}</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Click to attach default resume</span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Application</button>
                <button type="button" className="btn btn-secondary" onClick={() => { setShowApplyModal(false); setResumeFile(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
