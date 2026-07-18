import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AIInterview() {
  const { token, showToast } = useContext(AuthContext);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  
  // Simulated timeline
  const [questions] = useState([
    { id: 1, text: "Tell me about a time you resolved a major bug or technical conflict in a group project." },
    { id: 2, text: "Why do you want to join our organization as a Full Stack engineer?" },
    { id: 3, text: "Explain the difference between SQL and NoSQL databases, and when to use which." }
  ]);

  // Recorder states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedMinutes, setRecordedMinutes] = useState(0);
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);
  
  // Feedback states
  const [userResponse, setUserResponse] = useState('');
  const [feedbackData, setFeedbackData] = useState(null);
  const [evaluating, setEvaluating] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setRecordedMinutes(0);
    setRecordedSeconds(0);
    
    const interval = setInterval(() => {
      setRecordedSeconds((prev) => {
        if (prev === 59) {
          setRecordedMinutes((m) => m + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    setTimerId(interval);
    setFeedbackData(null);
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(timerId);
    setTimerId(null);
    
    // Simulate vocal speech-to-text transcript
    const sampleTranscripts = [
      "In our final year project, we had a major merge conflict where our SQL database queries were failing. I coordinated with my frontend counterpart, set up a Git session, analyzed the schema anomalies, corrected the indexing parameters, and resolved the issue which improved query speed by 25 percent.",
      "I want to join your organization because of your emphasis on scalable system design. My background in React frontend and Flask REST APIs aligns perfectly with your developer platform requirements.",
      "SQL databases are relational and structured, using schemas and tables suitable for ACID consistency. NoSQL databases are non-relational, scale horizontally, and use JSON document formats suitable for unstructured real-time analytical feeds."
    ];
    setUserResponse(sampleTranscripts[activeQuestionIdx]);
  };

  const handleSubmitInterview = () => {
    if (!token) {
      showToast('Please log in to receive AI grading', 'error');
      return;
    }
    if (!userResponse) {
      showToast('Please record or type your response first', 'error');
      return;
    }

    setEvaluating(true);
    fetch('/api/ai/interview-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        question: questions[activeQuestionIdx].text,
        response_text: userResponse
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbackData(data);
        setEvaluating(false);
        showToast('AI interview feedback compiled!', 'success');
      })
      .catch(() => {
        setEvaluating(false);
        showToast('Feedback calculation failed', 'error');
      });
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Top Banner */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>AI Mock Interview Simulator</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Simulate audio sessions with instant AI evaluations and transcript audits</p>
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '1.1fr 0.9fr', alignItems: 'stretch' }}>
        
        {/* Left Interview session */}
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Timeline tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setActiveQuestionIdx(idx);
                  setUserResponse('');
                  setFeedbackData(null);
                }}
                className="btn btn-sm btn-secondary"
                style={{
                  borderColor: activeQuestionIdx === idx ? 'var(--primary)' : 'var(--card-border)',
                  background: activeQuestionIdx === idx ? 'rgba(124, 58, 237, 0.08)' : 'transparent'
                }}
              >
                Round {idx + 1}
              </button>
            ))}
          </div>

          {/* Question card */}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--accent)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700 }}>INTERVIEW QUESTION</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '0.25rem', lineHeight: '1.5' }}>
              "{questions[activeQuestionIdx].text}"
            </p>
          </div>

          {/* Recorder Controls */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', padding: '2rem' }}>
            
            {/* Visualizer animation */}
            <div style={{ display: 'flex', gap: '4px', height: '40px', alignItems: 'center', width: '120px', justifyContent: 'center' }}>
              {isRecording ? (
                Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '3px',
                      background: 'var(--danger)',
                      animation: 'bounce 0.6s infinite alternate',
                      animationDelay: `${i * 0.06}s`,
                      height: `${Math.random() * 30 + 10}px`,
                      borderRadius: '99px'
                    }}
                  />
                ))
              ) : (
                <div style={{ width: '100%', height: '2px', background: 'var(--card-border)' }}></div>
              )}
            </div>

            <style>{`
              @keyframes bounce {
                from { height: 10px; }
                to { height: 35px; }
              }
            `}</style>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {!isRecording ? (
                <button className="btn btn-primary" onClick={startRecording}>
                  🎙️ Start Vocal Recording
                </button>
              ) : (
                <button className="btn btn-accent" onClick={stopRecording} style={{ background: 'var(--danger)' }}>
                  🛑 Stop Recording
                </button>
              )}
            </div>

            {isRecording && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Recording duration: {recordedMinutes.toString().padStart(2, '0')}:{recordedSeconds.toString().padStart(2, '0')}
              </span>
            )}
          </div>

          {/* Text Transcript */}
          {userResponse && (
            <div>
              <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Vocal speech-to-text Transcript</label>
              <textarea
                className="input-field"
                rows="4"
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem', width: '100%' }} onClick={handleSubmitInterview} disabled={evaluating}>
                {evaluating ? 'Analyzing response...' : 'Get AI Grading Feedback'}
              </button>
            </div>
          )}
        </div>

        {/* Right Feedback Panel */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>AI Feedback Report</h3>
          
          {feedbackData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>COMMS GRADE</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{feedbackData.communication_score}%</h4>
                </div>
                <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>RELEVANCE GRADE</span>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>{feedbackData.relevance_score}%</h4>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>CRITIQUE SUGGESTIONS</span>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {feedbackData.feedback.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Submit a response transcript to generate simulated AI analytics.</p>
          )}
        </div>

      </div>
    </div>
  );
}
