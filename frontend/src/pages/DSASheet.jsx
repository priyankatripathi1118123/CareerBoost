import React, { useState, useEffect } from 'react';
import dsaData from '../data/dsa_questions.json';

const topics = [
  'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 'Trees', 
  'Graphs', 'Heap', 'Trie', 'Dynamic Programming', 'Greedy', 
  'Backtracking', 'Sliding Window', 'Binary Search'
];

export default function DSASheet() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [progress, setProgress] = useState({});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [codeLanguage, setCodeLanguage] = useState('cpp'); // cpp, java, python

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('dsa_progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error("Failed to parse DSA progress from localStorage");
      }
    }
  }, []);

  const toggleSolved = (qId) => {
    setProgress(prev => {
      const newProgress = { ...prev, [qId]: !prev[qId] };
      localStorage.setItem('dsa_progress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const currentQuestions = dsaData[activeTopic] || [];
  const solvedCount = currentQuestions.filter(q => progress[q.id]).length;

  // Render Detailed Question View
  if (activeQuestion) {
    return (
      <div className="page-container fade-in-section" style={{ paddingBottom: '4rem' }}>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => setActiveQuestion(null)}
          style={{ marginBottom: '1.5rem' }}
        >
          &larr; Back to {activeTopic}
        </button>

        <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Header */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{activeQuestion.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className={`badge ${activeQuestion.difficulty === 'Easy' ? 'badge-easy' : activeQuestion.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                  {activeQuestion.difficulty}
                </span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: progress[activeQuestion.id] ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '8px', border: progress[activeQuestion.id] ? '1px solid var(--success)' : '1px solid var(--card-border)' }}>
                  <input 
                    type="checkbox" 
                    checked={!!progress[activeQuestion.id]}
                    onChange={() => toggleSolved(activeQuestion.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--success)' }}
                  />
                  <span style={{ fontWeight: 600, color: progress[activeQuestion.id] ? 'var(--success)' : 'var(--text-primary)' }}>
                    {progress[activeQuestion.id] ? 'Solved' : 'Mark as Solved'}
                  </span>
                </label>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {activeQuestion.companies.map((c, i) => (
                <span key={i} className="badge" style={{ background: 'var(--card-border)' }}>🏢 {c}</span>
              ))}
            </div>
          </div>

          <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left Column: Problem Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--primary)' }}>Problem Statement</h3>
                <p style={{ lineHeight: '1.7', color: 'var(--text-secondary)' }}>{activeQuestion.problem_statement}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Constraints</h3>
                <pre style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', color: 'var(--accent)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {activeQuestion.constraints}
                </pre>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sample Input</h4>
                  <code style={{ fontSize: '0.95rem' }}>{activeQuestion.sample_input}</code>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sample Output</h4>
                  <code style={{ fontSize: '0.95rem' }}>{activeQuestion.sample_output}</code>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Explanation</h3>
                <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>{activeQuestion.explanation}</p>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time Complexity</h4>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)' }}>{activeQuestion.time_complexity}</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Space Complexity</h4>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)' }}>{activeQuestion.space_complexity}</p>
                </div>
              </div>

            </div>

            {/* Right Column: Code Solutions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }}>
                <button 
                  onClick={() => setCodeLanguage('cpp')}
                  style={{ background: 'none', border: 'none', color: codeLanguage === 'cpp' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: codeLanguage === 'cpp' ? 700 : 500, cursor: 'pointer', padding: '0.5rem 1rem', borderBottom: codeLanguage === 'cpp' ? '2px solid var(--primary)' : '2px solid transparent' }}
                >
                  C++
                </button>
                <button 
                  onClick={() => setCodeLanguage('java')}
                  style={{ background: 'none', border: 'none', color: codeLanguage === 'java' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: codeLanguage === 'java' ? 700 : 500, cursor: 'pointer', padding: '0.5rem 1rem', borderBottom: codeLanguage === 'java' ? '2px solid var(--primary)' : '2px solid transparent' }}
                >
                  Java
                </button>
                <button 
                  onClick={() => setCodeLanguage('python')}
                  style={{ background: 'none', border: 'none', color: codeLanguage === 'python' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: codeLanguage === 'python' ? 700 : 500, cursor: 'pointer', padding: '0.5rem 1rem', borderBottom: codeLanguage === 'python' ? '2px solid var(--primary)' : '2px solid transparent' }}
                >
                  Python
                </button>
              </div>

              <div style={{ flex: 1, background: '#1e1e1e', borderRadius: '8px', padding: '1.5rem', overflowX: 'auto', border: '1px solid #333' }}>
                <pre style={{ margin: 0, color: '#d4d4d4', fontFamily: "'Fira Code', 'Consolas', monospace", fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {activeQuestion.code[codeLanguage]}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Table View
  return (
    <div className="page-container fade-in-section" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      {/* Topics Sidebar */}
      <div className="glass-card" style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', padding: '1.5rem 0' }}>
        <h3 style={{ padding: '0 1.5rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 800, fontSize: '1.2rem' }}>DSA Topics</h3>
        {topics.map(topic => {
          const topicQuestions = dsaData[topic] || [];
          const topicSolved = topicQuestions.filter(q => progress[q.id]).length;
          
          return (
            <button
              key={topic}
              onClick={() => setActiveTopic(topic)}
              style={{
                padding: '0.75rem 1.5rem',
                textAlign: 'left',
                background: activeTopic === topic ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                border: 'none',
                borderLeft: activeTopic === topic ? '4px solid var(--primary)' : '4px solid transparent',
                color: activeTopic === topic ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontWeight: activeTopic === topic ? 700 : 500,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{topic}</span>
              {topicSolved > 0 && <span style={{ fontSize: '0.75rem', background: 'var(--primary)', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '12px' }}>{topicSolved}/30</span>}
            </button>
          )
        })}
      </div>

      {/* Questions List */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{activeTopic}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Master {activeTopic} with these 30 essential interview questions.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: solvedCount === 30 ? 'var(--success)' : 'var(--primary)' }}>
              {solvedCount} <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>/ 30</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Solved</div>
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-app)', zIndex: 1 }}>
              <tr style={{ borderBottom: '1px solid var(--card-border)', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1.5rem', width: '80px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '1.5rem' }}>Problem Statement</th>
                <th style={{ padding: '1.5rem', width: '120px' }}>Difficulty</th>
                <th style={{ padding: '1.5rem', width: '120px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.map((q, idx) => (
                <tr key={q.id} className="hover-effect" style={{ borderBottom: '1px solid var(--card-border)', background: progress[q.id] ? 'rgba(16, 185, 129, 0.02)' : 'transparent', transition: 'background 0.2s ease' }}>
                  <td style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={!!progress[q.id]}
                      onChange={() => toggleSolved(q.id)}
                      style={{ cursor: 'pointer', width: '20px', height: '20px', accentColor: 'var(--success)' }}
                    />
                  </td>
                  <td style={{ padding: '1.5rem', fontWeight: 600, color: progress[q.id] ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: progress[q.id] ? 'line-through' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', width: '24px' }}>{idx + 1}.</span>
                      {q.title}
                    </div>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <span className={`badge ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td style={{ padding: '1.5rem' }}>
                    <button 
                      className="btn btn-primary btn-sm" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      onClick={() => setActiveQuestion(q)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
