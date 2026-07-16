import React, { useState } from 'react';

const topics = [
  'Arrays', 'Strings', 'Linked List', 'Stack', 'Queue', 'Trees', 
  'Graphs', 'Heap', 'Trie', 'Dynamic Programming', 'Greedy', 
  'Backtracking', 'Sliding Window', 'Binary Search'
];

// Generate 30 dummy questions for each topic
const generateQuestions = (topicName) => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: `${topicName.toLowerCase().replace(' ', '-')}-${i + 1}`,
    title: `${topicName} Question ${i + 1}`,
    difficulty: i % 3 === 0 ? 'Easy' : i % 3 === 1 ? 'Medium' : 'Hard',
    solved: false,
    hasSolution: true
  }));
};

const allQuestions = topics.reduce((acc, topic) => {
  acc[topic] = generateQuestions(topic);
  return acc;
}, {});

export default function DSASheet() {
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [progress, setProgress] = useState({});

  const toggleSolved = (qId) => {
    setProgress(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const currentQuestions = allQuestions[activeTopic];
  const solvedCount = currentQuestions.filter(q => progress[q.id]).length;

  return (
    <div className="page-container" style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      {/* Topics Sidebar */}
      <div className="card" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', padding: '1rem 0' }}>
        <h3 style={{ padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>DSA Topics</h3>
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            style={{
              padding: '0.75rem 1rem',
              textAlign: 'left',
              background: activeTopic === topic ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
              border: 'none',
              borderLeft: activeTopic === topic ? '3px solid var(--primary)' : '3px solid transparent',
              color: activeTopic === topic ? 'var(--primary)' : 'var(--text-primary)',
              cursor: 'pointer',
              fontWeight: activeTopic === topic ? 600 : 400
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{activeTopic}</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Master {activeTopic} with these curated questions.</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{solvedCount} / 30</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Solved</div>
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--card-border)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem', width: '60px' }}>Status</th>
                <th style={{ padding: '1rem' }}>Problem</th>
                <th style={{ padding: '1rem', width: '100px' }}>Difficulty</th>
                <th style={{ padding: '1rem', width: '100px' }}>Solution</th>
              </tr>
            </thead>
            <tbody>
              {currentQuestions.map(q => (
                <tr key={q.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={!!progress[q.id]}
                      onChange={() => toggleSolved(q.id)}
                      style={{ cursor: 'pointer', width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 500, color: progress[q.id] ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: progress[q.id] ? 'line-through' : 'none' }}>
                    {q.title}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor: q.difficulty === 'Easy' ? 'rgba(34, 197, 94, 0.1)' : q.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: q.difficulty === 'Easy' ? '#22c55e' : q.difficulty === 'Medium' ? '#eab308' : '#ef4444'
                    }}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>📄 View</button>
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
