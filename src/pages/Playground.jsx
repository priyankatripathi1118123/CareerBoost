import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Playground() {
  const { user, setUser, token, showToast } = useContext(AuthContext);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(`// Solve: Return indices of the two numbers such that they add up to target.\nfunction twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`);
  const [consoleLogs, setConsoleLogs] = useState('Write algorithms and run compilers.');
  const [isCompiling, setIsCompiling] = useState(false);

  const listProblems = [
    { id: 1, title: 'Two Sum', diff: 'Easy', time: 'O(N)', space: 'O(N)' },
    { id: 2, title: 'Best Time to Buy & Sell Stock', diff: 'Easy', time: 'O(N)', space: 'O(1)' },
    { id: 3, title: 'Longest Substring Without Repeating Characters', diff: 'Medium', time: 'O(N)', space: 'O(min(M, N))' }
  ];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (lang === 'python') {
      setCode(`def twoSum(nums, target):\n    # Write Python code here\n    hashmap = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hashmap:\n            return [hashmap[complement], i]\n        hashmap[num] = i\n    return []`);
    } else if (lang === 'cpp') {
      setCode(`#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for(int i=0; i<nums.size(); ++i) {\n        int comp = target - nums[i];\n        if(map.count(comp)) return {map[comp], i};\n        map[nums[i]] = i;\n    }\n    return {};\n}`);
    } else {
      setCode(`// Solve: Return indices of the two numbers such that they add up to target.\nfunction twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`);
    }
  };

  const handleRunCode = (isSubmit = false) => {
    setIsCompiling(true);
    setConsoleLogs('Compiling scripts... testing edge inputs\n');

    fetch('/api/prep/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ code, language })
    })
      .then((res) => res.json())
      .then((data) => {
        setIsCompiling(false);
        if (data.error) {
          setConsoleLogs(data.output);
          showToast('Syntax Error in algorithm code', 'error');
        } else {
          setConsoleLogs(data.output);
          showToast(`Success! Earned +${data.xp_gained} XP`, 'success');
          // Update client stats
          if (user) {
            setUser({ ...user, xp: user.xp + data.xp_gained });
          }
        }
      })
      .catch(() => {
        setIsCompiling(false);
        setConsoleLogs('Error: Compiler service offline.');
      });
  };

  return (
    <div className="fade-in-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Playground Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Coding Playground</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Practice DSA problems and compile code in real-time</p>
        </div>

        {/* Action controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select
            className="input-field"
            style={{ width: '130px', padding: '0.5rem 1rem' }}
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python 3</option>
            <option value="cpp">C++ (GCC)</option>
          </select>
          <button className="btn btn-secondary btn-sm" onClick={() => handleLanguageChange(language)}>Reset</button>
        </div>
      </div>

      {/* Editor & Sidebar splits */}
      <div className="grid-2" style={{ gridTemplateColumns: '0.4fr 1.6fr', alignItems: 'stretch' }}>
        
        {/* Left Problems Lists */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>CURRICULUM PROBLEMS</span>
          {listProblems.map((prob) => (
            <div key={prob.id} className="glass-card" style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: 700 }}>{prob.title}</h5>
                <span className="badge badge-easy" style={{ fontSize: '0.65rem' }}>{prob.diff}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>T: {prob.time} | S: {prob.space}</span>
            </div>
          ))}
        </div>

        {/* Right Code Editor & Console */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '600px' }}>
          {/* Mock Monaco Editor Area */}
          <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#090d16', position: 'relative' }}>
            <div style={{
              display: 'flex',
              background: 'rgba(0,0,0,0.2)',
              borderBottom: '1px solid var(--card-border)',
              padding: '0.45rem 1rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              justifyContent: 'space-between'
            }}>
              <span>main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'cpp'}</span>
              <span>Workspace</span>
            </div>
            
            <textarea
              className="input-field"
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                fontFamily: 'monospace',
                fontSize: '0.92rem',
                color: '#a9b1d6',
                padding: '1.25rem',
                resize: 'none',
                outline: 'none',
                lineHeight: '1.6'
              }}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* Console logs output */}
          <div className="glass-panel" style={{ height: '200px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: 'rgba(0,0,0,0.1)',
              borderBottom: '1px solid var(--card-border)',
              padding: '0.45rem 1rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>Console Logs</span>
              <span style={{ color: consoleLogs.includes('🟢') ? 'var(--success)' : 'var(--text-secondary)' }}>
                {isCompiling ? 'Running tests...' : 'Ready'}
              </span>
            </div>

            <div style={{
              flex: 1,
              background: '#070a0f',
              padding: '0.75rem 1rem',
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              color: consoleLogs.includes('ReferenceError') ? 'var(--danger)' : '#a5b4fc',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {consoleLogs}
            </div>

            <div style={{ display: 'flex', padding: '0.5rem 1rem', background: 'rgba(0,0,0,0.15)', borderTop: '1px solid var(--card-border)', gap: '1rem' }}>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => handleRunCode(false)}>
                ▶ Run Code
              </button>
              <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => handleRunCode(true)}>
                🚀 Submit Code
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
