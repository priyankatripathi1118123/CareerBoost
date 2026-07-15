import React from 'react';

export default function InterviewQuestions() {
  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Interview Questions</h1>
        <p>A comprehensive list of HR and Technical interview questions frequently asked.</p>
      </header>
      
      <div className="card" style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2>Questions Database Coming Soon</h2>
        <p style={{ marginTop: '1rem' }}>We're currently compiling the best questions from recent interviews.</p>
      </div>
    </div>
  );
}
