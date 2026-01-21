import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [glitchText, setGlitchText] = useState(false);

  const API_BASE = "PASTE_YOUR_API_INVOKE_URL_HERE";

  // Glitch effect on title
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!message) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error calling API:", error);
      setResponse({ error: "Failed to connect to the Financial Advisor API" });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Animated background grid */}
      <div className="grid-background"></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}></div>
        ))}
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 100 100" className="logo-svg">
                <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="url(#gradient)" strokeWidth="2"/>
                <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="url(#gradient)" strokeWidth="1.5"/>
                <circle cx="50" cy="50" r="15" fill="none" stroke="url(#gradient)" strokeWidth="1"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#06b6d4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className={`title ${glitchText ? 'glitch' : ''}`} data-text="FINANCIAL ADVISOR">
              FINANCIAL ADVISOR
            </h1>
          </div>
          <div className="status-bar">
            <div className="status-item">
              <span className="status-dot online"></span>
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="status-item">
              <span className="status-label">VERSION</span>
              <span className="status-value">2.0.47</span>
            </div>
            <div className="status-item">
              <span className="status-label">LATENCY</span>
              <span className="status-value">12ms</span>
            </div>
          </div>
        </header>

        {/* Chat container */}
        <div className="chat-container">
          {/* Input section */}
          <div className="input-section">
            <div className="section-header">
              <span className="section-icon">◆</span>
              <span className="section-title">QUERY INPUT</span>
              <div className="section-line"></div>
            </div>
            
            <div className="textarea-wrapper">
              <textarea
                rows="4"
                placeholder="Enter your financial query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="cyber-textarea"
              />
              <div className="textarea-corner tl"></div>
              <div className="textarea-corner tr"></div>
              <div className="textarea-corner bl"></div>
              <div className="textarea-corner br"></div>
            </div>

            <div className="button-row">
              
              {/*
              <span className="hint-text">CTRL + ENTER to send</span>
              */}

              <button 
                onClick={handleSend} 
                disabled={loading}
                className={`cyber-button ${loading ? 'loading' : ''}`}
              >
                <span className="button-content">
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      PROCESSING...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">▶</span>
                      TRANSMIT
                    </>
                  )}
                </span>
                <div className="button-glare"></div>
              </button>
            </div>
          </div>

          {/* Response section */}
          <div className="response-section">
            <div className="section-header">
              <span className="section-icon">◇</span>
              <span className="section-title">AI RESPONSE</span>
              <div className="section-line"></div>
              <div className={`live-indicator ${response ? 'active' : ''}`}>
                <span className="live-dot"></span>
                {response ? 'DATA RECEIVED' : 'AWAITING INPUT'}
              </div>
            </div>

            <div className="response-wrapper">
              <div className="response-content">
                {loading && (
                  <div className="loading-animation">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <span className="loading-text">ANALYZING QUERY...</span>
                  </div>
                )}
                
                {!loading && response && (
                  <pre className="response-text">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                )}
                
                {!loading && !response && (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5"/>
                        <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.3"/>
                      </svg>
                    </div>
                    <p>WAITING FOR INPUT...</p>
                    <span className="empty-subtitle">Enter a query to receive AI-powered financial insights</span>
                  </div>
                )}
              </div>
              <div className="response-scanline"></div>
            </div>
          </div>
        </div>

        
        {/* Footer stats */}
        <footer className="footer">
          {/*

          <div className="stat-box">
            <span className="stat-value">256</span>
            <span className="stat-label">BIT ENCRYPTION</span>
          </div>

          */}

          <div className="stat-box">
            <span className="stat-value">99.9%</span>
            <span className="stat-label">UPTIME</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">∞</span>
            <span className="stat-label">QUERIES</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">AI</span>
            <span className="stat-label">POWERED</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;