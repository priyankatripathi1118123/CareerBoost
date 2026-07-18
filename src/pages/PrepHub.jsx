import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PrepHub() {
  const { user, setUser, token, showToast } = useContext(AuthContext);
  const [activeTopic, setActiveTopic] = useState('aptitude');
  const [prepData, setPrepData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('notes'); // notes, quiz, interviews

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);

  const topics = [
    { id: 'aptitude', name: 'Aptitude' },
    { id: 'logical', name: 'Logical Reasoning' },
    { id: 'verbal', name: 'Verbal Ability' },
    { id: 'sql', name: 'SQL Querying' },
    { id: 'dbms', name: 'DBMS Core' },
    { id: 'os', name: 'Operating System' },
    { id: 'networks', name: 'Computer Networks' },
    { id: 'oop', name: 'OOP Fundamentals' }
  ];

  const fetchPrepData = () => {
    setLoading(true);
    fetch(`/api/prep/${activeTopic}`)
      .then((res) => res.json())
      .then((data) => {
        setPrepData(data);
        setLoading(false);
        resetQuiz();
      })
      .catch(() => {
        showToast('Error loading preparation module data', 'error');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrepData();
  }, [activeTopic]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setScore(0);
  };

  const handleOptionSelect = (idx) => {
    if (isChecked) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null || isChecked) return;
    setIsChecked(true);

    const isCorrect = selectedOption === prepData.mcqs[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(score + 1);
      // Give simulated XP bonus
      if (user) {
        const updatedUser = { ...user, xp: user.xp + 10 };
        setUser(updatedUser);
        showToast('Correct Answer! +10 XP earned', 'success');
      }
    } else {
      showToast('Incorrect Answer. See explanation below.', 'error');
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsChecked(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Topics tab switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTopic(t.id)}
            className="btn btn-sm btn-secondary"
            style={{
              borderColor: activeTopic === t.id ? 'var(--primary)' : 'var(--card-border)',
              background: activeTopic === t.id ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
              color: activeTopic === t.id ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ gridTemplateColumns: '0.35fr 1.65fr', alignItems: 'stretch' }}>
        
        {/* Left Info Panel */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PREPARATION CATEGORY</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.25rem' }}>{prepData ? prepData.title : 'Loading...'}</h3>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DIFFICULTY</span>
            <p style={{ marginTop: '0.25rem' }}>
              <span className={`badge ${
                prepData?.difficulty.includes('Easy') ? 'badge-easy' : prepData?.difficulty.includes('Hard') ? 'badge-hard' : 'badge-medium'
              }`}>
                {prepData ? prepData.difficulty : 'Medium'}
              </span>
            </p>
          </div>

          {/* Sub Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              onClick={() => setActiveSubTab('notes')}
              className="btn btn-secondary btn-sm"
              style={{
                justifyContent: 'flex-start',
                background: activeSubTab === 'notes' ? 'rgba(255,255,255,0.02)' : 'none',
                border: activeSubTab === 'notes' ? '1px solid var(--accent)' : '1px solid transparent'
              }}
            >
              📖 Lecture Notes
            </button>
            <button
              onClick={() => setActiveSubTab('quiz')}
              className="btn btn-secondary btn-sm"
              style={{
                justifyContent: 'flex-start',
                background: activeSubTab === 'quiz' ? 'rgba(255,255,255,0.02)' : 'none',
                border: activeSubTab === 'quiz' ? '1px solid var(--accent)' : '1px solid transparent'
              }}
            >
              📝 Practice MCQs
            </button>
            <button
              onClick={() => setActiveSubTab('interviews')}
              className="btn btn-secondary btn-sm"
              style={{
                justifyContent: 'flex-start',
                background: activeSubTab === 'interviews' ? 'rgba(255,255,255,0.02)' : 'none',
                border: activeSubTab === 'interviews' ? '1px solid var(--accent)' : '1px solid transparent'
              }}
            >
              🏢 Interview Questions
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="skeleton" style={{ height: '30px', width: '60%' }}></div>
              <div className="skeleton" style={{ height: '80px' }}></div>
              <div className="skeleton" style={{ height: '80px' }}></div>
            </div>
          ) : (
            <>
              {activeSubTab === 'notes' && prepData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>High-Yield Preparation Notes</h3>
                  
                  {prepData.notes.map((note, idx) => (
                    <div key={idx} className="glass-card" style={{ padding: '1.25rem', lineHeight: '1.6' }}>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{note}</p>
                    </div>
                  ))}

                  {/* Video Lesson Embed Mock */}
                  {prepData.videos && prepData.videos.length > 0 && (
                    <div style={{ marginTop: '1.5rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.75rem' }}>Recommended Video Tutorial</h4>
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                        <iframe
                          title={prepData.videos[0].title}
                          src={prepData.videos[0].url}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeSubTab === 'quiz' && prepData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {currentQuestionIndex < prepData.mcqs.length ? (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <span>Question {currentQuestionIndex + 1} of {prepData.mcqs.length}</span>
                        <span>Score: {score}</span>
                      </div>

                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: '1.5', marginBottom: '1.5rem' }}>
                        {prepData.mcqs[currentQuestionIndex].question}
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        {prepData.mcqs[currentQuestionIndex].options.map((opt, oIdx) => {
                          let optStyle = {
                            border: '1px solid var(--card-border)',
                            background: 'rgba(255,255,255,0.01)'
                          };

                          if (selectedOption === oIdx && !isChecked) {
                            optStyle.border = '1px solid var(--primary)';
                            optStyle.background = 'rgba(124,58,237,0.05)';
                          }

                          if (isChecked) {
                            if (oIdx === prepData.mcqs[currentQuestionIndex].answer) {
                              optStyle.border = '1px solid var(--success)';
                              optStyle.background = 'rgba(16,185,129,0.08)';
                            } else if (selectedOption === oIdx) {
                              optStyle.border = '1px solid var(--danger)';
                              optStyle.background = 'rgba(239,68,68,0.08)';
                            }
                          }

                          return (
                            <div
                              key={oIdx}
                              onClick={() => handleOptionSelect(oIdx)}
                              style={{
                                padding: '1rem',
                                borderRadius: '8px',
                                cursor: isChecked ? 'default' : 'pointer',
                                ...optStyle
                              }}
                            >
                              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{opt}</span>
                            </div>
                          );
                        })}
                      </div>

                      {!isChecked ? (
                        <button
                          className="btn btn-primary"
                          style={{ width: '100%' }}
                          onClick={handleCheckAnswer}
                          disabled={selectedOption === null}
                        >
                          Check Answer
                        </button>
                      ) : (
                        <button
                          className="btn btn-accent"
                          style={{ width: '100%' }}
                          onClick={handleNextQuestion}
                        >
                          {currentQuestionIndex + 1 === prepData.mcqs.length ? "Finish Quiz" : "Next Question"}
                        </button>
                      )}
                    </div>
                  ) : (
                    // Quiz End
                    <div style={{ textAlign: 'center', padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
                      <div style={{ fontSize: '3rem' }}>🎉</div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Practice Quiz Completed!</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        Your final score: <strong>{score}</strong> out of <strong>{prepData.mcqs.length}</strong>.
                      </p>
                      <button className="btn btn-secondary" onClick={resetQuiz}>
                        🔄 Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeSubTab === 'interviews' && prepData && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Previous Corporate Interview Questions</h3>
                  {prepData.interviews && prepData.interviews.length > 0 ? (
                    prepData.interviews.map((item, idx) => (
                      <div key={idx} className="glass-card" style={{ padding: '1.25rem', borderLeft: '4px solid var(--accent)' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>{item}</p>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No interview questions cataloged for this topic yet.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}
