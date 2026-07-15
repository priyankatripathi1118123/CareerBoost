import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AICareer() {
  const { token, showToast } = useContext(AuthContext);
  
  // Roadmap states
  const [skills, setSkills] = useState('React, JavaScript, HTML, CSS');
  const [interest, setInterest] = useState('Frontend Engineering');
  const [roadmapData, setRoadmapData] = useState(null);
  const [loadingMap, setLoadingMap] = useState(false);

  // Chatbot states
  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState([
    { sender: 'bot', text: 'Hello! I am your FutureHire AI placement assistant. Ask me questions about resumes, interview answers, or code sheets.' }
  ]);
  const [botReplying, setBotReplying] = useState(false);

  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    if (!token) {
      showToast('Please log in to query AI roadmaps', 'error');
      return;
    }

    setLoadingMap(true);
    const skillList = skills.split(',').map(s => s.trim());

    fetch('/api/ai/recommendation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ skills: skillList, interests: [interest] })
    })
      .then((res) => res.json())
      .then((data) => {
        setRoadmapData(data);
        setLoadingMap(false);
        showToast('AI Career Roadmap generated!', 'success');
      })
      .catch(() => {
        setLoadingMap(false);
        showToast('Roadmap generation failed', 'error');
      });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = { sender: 'user', text: chatMessage };
    setChatLogs((prev) => [...prev, userMsg]);
    setChatMessage('');
    setBotReplying(true);

    fetch('/api/ai/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatMessage })
    })
      .then((res) => res.json())
      .then((data) => {
        setChatLogs((prev) => [...prev, { sender: 'bot', text: data.response }]);
        setBotReplying(false);
      })
      .catch(() => {
        setChatLogs((prev) => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting to AI services right now.' }]);
        setBotReplying(false);
      });
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>AI Career Coach & Roadmap Builder</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Map career paths, analyze skill gaps, and chat with our chatbot advisor</p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'stretch' }}>
        
        {/* Left Roadmap form & Display */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem' }}>Skill Gap Roadmap Builder</h3>
            <form onSubmit={handleGenerateRoadmap} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Current Skills (Comma separated)</label>
                <input type="text" className="input-field" value={skills} onChange={(e) => setSkills(e.target.value)} />
              </div>

              <div>
                <label className="form-label">Target Career Track</label>
                <select className="input-field" value={interest} onChange={(e) => setInterest(e.target.value)}>
                  <option value="Frontend Engineering">Frontend Engineering</option>
                  <option value="Backend Engineering">Backend Engineering</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-sm" disabled={loadingMap}>
                {loadingMap ? 'Analyzing path nodes...' : 'Generate Career Roadmap'}
              </button>
            </form>
          </div>

          {/* Roadmap visual map nodes */}
          {roadmapData && (
            <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RECOMMENDED ROLE</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent)' }}>{roadmapData.recommended_role}</h4>
              </div>

              {/* Skill gap warnings */}
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>DETECTED SKILL GAPS</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {roadmapData.skill_gaps.map((gap) => (
                    <span key={gap} className="badge badge-hard" style={{ fontSize: '0.7rem' }}>
                      {gap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Timeline Stepper */}
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.75rem' }}>LEARNING CURRICULUM TIMELINE</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {roadmapData.roadmap.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 800
                      }}>
                        {idx + 1}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Right Chatbot card */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '560px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.75rem' }}>Placement Advisor Bot</h3>
          
          {/* Chatlogs window */}
          <div style={{
            flex: 1,
            background: 'rgba(0,0,0,0.15)',
            border: '1px solid var(--card-border)',
            borderRadius: '8px',
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1rem'
          }}>
            {chatLogs.map((log, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: log.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  background: log.sender === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                  border: log.sender === 'user' ? 'none' : '1px solid var(--card-border)',
                  padding: '0.65rem 0.95rem',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  lineHeight: '1.4',
                  color: 'var(--text-primary)'
                }}
              >
                {log.text}
              </div>
            ))}
            {botReplying && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                Advisor is typing...
              </div>
            )}
          </div>

          {/* Chat input form */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="input-field"
              placeholder="Ask: How do I improve ATS score?"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary btn-sm">Send</button>
          </form>
        </div>

      </div>
    </div>
  );
}
