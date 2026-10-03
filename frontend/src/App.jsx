import { useState, useEffect } from 'react'
import './App.css'
import { extractTextFromImage, terminateWorker } from './services/ocr'

const SAMPLE_MESSAGES = {
  high: "PREMIUM VIP TRADING GROUP\n\n100% GUARANTEED PROFIT\nEarn ₹5000 daily with Nifty options.\n\nPay ₹2000 via UPI:\nscammer@upi\n\nOnly 2 spots left!\nJoin now before the offer expires!",
  suspicious: "Exclusive market tips available.\nPay ₹999 via UPI to receive premium investment calls.\nOnly 2 seats left this week.",
  low: "Reminder: Market investments involve risk.\nPast performance does not guarantee future returns.\nPlease verify your broker and investment information through official sources."
};

function App() {
  const [mode, setMode] = useState('paste') // 'paste' or 'upload'
  const [lang, setLang] = useState('english')
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  
  const [status, setStatus] = useState('empty') // empty, processing_ocr, review_ocr, analyzing, result, error
  const [result, setResult] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [ocrProgress, setOcrProgress] = useState(0)
  const [ocrStatusMsg, setOcrStatusMsg] = useState('Initializing...')

  useEffect(() => {
    return () => {
      terminateWorker();
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrorMsg('File size must be less than 5 MB.');
        setFile(null);
        e.target.value = null; // Reset input
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMsg('Please upload a valid image (JPG/PNG/WebP).');
        setFile(null);
        e.target.value = null;
        return;
      }

      setFile(selectedFile);
      setErrorMsg('');
    }
  }

  const handleExtractText = async () => {
    if (!file) {
      setErrorMsg('Please select an image file first.');
      return;
    }

    setStatus('processing_ocr');
    setErrorMsg('');
    setOcrProgress(0);
    setOcrStatusMsg('initializing');

    try {
      const extracted = await extractTextFromImage(file, (progress, msg) => {
        setOcrProgress(progress);
        setOcrStatusMsg(msg);
      });

      if (!extracted || extracted.length < 5) {
        throw new Error("We couldn't read the image clearly. Please type or paste the message instead.");
      }

      setText(extracted);
      setStatus('review_ocr');
    } catch (err) {
      setErrorMsg(err.message);
      setMode('paste'); // Fallback to manual paste
      setStatus('empty');
      setFile(null);
    }
  }

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setErrorMsg('Please enter some text to analyze.');
      return;
    }

    setStatus('analyzing');
    setErrorMsg('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error');
      }

      const data = await response.json();
      setResult(data);
      setStatus('result');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to connect to the server.');
      setStatus('error');
    }
  }

  const handleReset = () => {
    setText('');
    setFile(null);
    setResult(null);
    setStatus('empty');
    setErrorMsg('');
  }

  const loadSample = (type) => {
    setMode('paste');
    setText(SAMPLE_MESSAGES[type]);
    setErrorMsg('');
  };

  return (
    <div className="container">
      <header className="header">
        <h1>SachiBaat</h1>
        <p className="subtitle">Investor Protection</p>
        <p className="explanation">Check if a financial message or screenshot is safe.</p>
        <div className="privacy-top-banner" style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '10px', fontSize: '13px', textAlign: 'center', borderBottom: '1px solid #bae6fd', width: '100%', boxSizing: 'border-box', fontWeight: '500' }}>
  🔒 <strong>Privacy Assurance:</strong> Uploaded content is processed locally and is not stored after analysis.
</div>

      </header>

      <main className="main-content">
        {(status === 'empty' || status === 'error') && (
          <div className="input-section">
            <div className="mode-toggle">
              <button 
                className={`toggle-btn ${mode === 'paste' ? 'active' : ''}`}
                onClick={() => { setMode('paste'); setErrorMsg(''); }}
              >
                📝 Paste Text
              </button>
              <button 
                className={`toggle-btn ${mode === 'upload' ? 'active' : ''}`}
                onClick={() => { setMode('upload'); setErrorMsg(''); }}
              >
                📸 Upload Screenshot
              </button>
            </div>

            {errorMsg && <div className="error-message">{errorMsg}</div>}

            {mode === 'paste' ? (
              <div className="paste-mode">
                <textarea
                  className="message-input"
                  placeholder="Paste suspicious message here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                />
                
                <div className="sample-section" style={{ marginBottom: '15px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: '#555', fontWeight: 'bold' }}>Try a sample</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      className="sample-btn"
                      style={{ padding: '8px 12px', fontSize: '0.85em', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', flex: '1', minWidth: '80px', color: '#333' }}
                      onClick={() => loadSample('high')}
                    >
                      HIGH Risk
                    </button>
                    <button 
                      className="sample-btn"
                      style={{ padding: '8px 12px', fontSize: '0.85em', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', flex: '1', minWidth: '80px', color: '#333' }}
                      onClick={() => loadSample('suspicious')}
                    >
                      SUSPICIOUS
                    </button>
                    <button 
                      className="sample-btn"
                      style={{ padding: '8px 12px', fontSize: '0.85em', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', flex: '1', minWidth: '80px', color: '#333' }}
                      onClick={() => loadSample('low')}
                    >
                      LOW Risk
                    </button>
                  </div>
                </div>

                <button className="analyze-btn" onClick={handleAnalyze}>

                  Analyze
                </button>
              </div>
            ) : (
              <div className="upload-mode">
                <div className="file-input-container">
                  <label htmlFor="file-upload" className="file-upload-label">
                    Upload a screenshot of the message
                  </label>
                  <input 
                    id="file-upload"
                    type="file" 
                    accept="image/jpeg,image/png,image/webp" 
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  {file && (
                    <div className="file-preview">
                      <p>Selected: <strong>{file.name}</strong></p>
                      <button className="remove-file-btn" onClick={() => setFile(null)}>
                        Remove / Change Image
                      </button>
                    </div>
                  )}
                </div>
                
                <button 
                  className="analyze-btn" 
                  onClick={handleExtractText}
                  disabled={!file}
                >
                  Analyze
                </button>
              </div>
            )}
          </div>
        )}

        {status === 'processing_ocr' && (
          <div className="loading-section">
            <div className="spinner"></div>
            {ocrStatusMsg === 'initializing' ? (
              <div className="ocr-status-messages">
                <p><strong>Preparing offline text scanning...</strong></p>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>First scan may take a little longer.</p>
                <p><strong>ऑफलाइन टेक्स्ट स्कैनिंग तैयार हो रही है...</strong></p>
                <p style={{ fontSize: '0.9em', color: '#666' }}>पहली बार थोड़ा ज़्यादा समय लग सकता है।</p>
              </div>
            ) : (
              <div className="ocr-status-messages">
                <p><strong>Reading text from your screenshot...</strong></p>
                <p><strong>स्क्रीनशॉट से टेक्स्ट पढ़ रहे हैं...</strong></p>
              </div>
            )}
            {ocrProgress > 0 && <p className="progress-text" style={{ marginTop: '15px' }}>{ocrProgress}%</p>}
          </div>
        )}

        {status === 'review_ocr' && (
          <div className="review-section">
            <h3>Review the extracted text</h3>
            <p className="explanation">OCR isn't perfect. Please correct any mistakes before continuing analysis.</p>
            <textarea
              className="message-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
            />
            {errorMsg && <div className="error-message">{errorMsg}</div>}
            <div className="action-buttons">
              <button className="analyze-btn" onClick={handleAnalyze}>
                Continue Analysis
              </button>
              <button className="reset-btn" onClick={handleReset} style={{marginLeft: '10px'}}>
                Try Another Image
              </button>
            </div>
          </div>
        )}

        {status === 'analyzing' && (
          <div className="loading-section">
            <div className="spinner"></div>
            <p>Analyzing for risk signals...</p>
          </div>
        )}

        {status === 'result' && result && (
          <div className="result-section">
            <div className={`risk-banner risk-${result.riskLevel.toLowerCase()}`}>
              <h2>Risk Level: {result.riskLevel}</h2>
              <p className="risk-wording">
                {result.riskLevel === 'HIGH' && "This message contains multiple high-risk scam indicators."}
                {result.riskLevel === 'SUSPICIOUS' && "This message shows some suspicious patterns often used in misleading claims."}
                {result.riskLevel === 'LOW' && "We did not find common scam patterns in this text."}
              </p>
              <p>{result.redFlagCount} red flags detected</p>
            </div>

            {result.triggeredRules.length > 0 && (
              <div className="rules-section">
                <h3>Detected Red Flags:</h3>
                <ul>
                  {result.triggeredRules.map((r, i) => (
                    <li key={i}>
                      <strong>{r.category}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.aiExplanation && result.triggeredRules.length > 0 && (
              <div className="ai-explanation-section">
                {result.aiExplanation.source === 'fallback' && (
                  <div className="fallback-notice" style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px', marginBottom: '15px', color: '#856404', fontSize: '0.9em' }}>
                    {lang === 'hindi' 
                      ? "AI स्पष्टीकरण अस्थायी रूप से अनुपलब्ध है। नीचे दिया गया जोखिम मूल्यांकन SachiBaat के सुरक्षित नियमों पर आधारित है।" 
                      : "AI explanation is temporarily unavailable. The risk assessment below is based on SachiBaat's deterministic safety rules."}
                  </div>
                )}
                <div className="explanation-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Why this was flagged</h3>
                  <div className="lang-toggle">
                    <button 
                      className={`toggle-btn ${lang === 'english' ? 'active' : ''}`} 
                      onClick={() => setLang('english')}
                      style={{ padding: '2px 8px', marginRight: '5px' }}
                    >EN</button>
                    <button 
                      className={`toggle-btn ${lang === 'hindi' ? 'active' : ''}`} 
                      onClick={() => setLang('hindi')}
                      style={{ padding: '2px 8px' }}
                    >HI</button>
                  </div>
                </div>
                <div className="explanation-content" style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <p style={{ fontWeight: 'bold' }}>{result.aiExplanation[lang]?.summary}</p>
                  <ul style={{ marginTop: '10px' }}>
                    {result.aiExplanation[lang]?.points?.map((point, i) => (
                      <li key={i} style={{ marginBottom: '5px' }}>{point}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: '0.8em', color: '#666', marginTop: '10px' }}>
                    Source: {result.aiExplanation.source === 'gemini' ? 'AI Generated' : 'System Rules'}
                  </p>
                </div>
              </div>
            )}

            {result.actions.length > 0 && (
              <div className="actions-section">
                <h3>Safe Next Actions:</h3>
                <ul>
                  {result.actions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
                {/* Checklist Requirement: 1930 / Cybercrime Emergency Reporting Guidance */}
<div className="cybercrime-action-alert" style={{ background: '#fff5f5', border: '1px solid #feb2b2', padding: '14px', borderRadius: '8px', marginTop: '16px', textAlign: 'left' }}>
  <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#991b1b', fontWeight: 'bold' }}>
    📞 National Cyber Crime Helpline (1930) / Report Financial Fraud
  </h5>
  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>
    If you have been a victim of financial fraud or an online scam, immediately dial the National Helpline at <strong style={{ color: '#ef4444', fontSize: '15px' }}>1930</strong> or file an official report online at the government portal: <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'underline' }}>cybercrime.gov.in</a>.
  </p>
</div>

              </div>
            )}

            <div className="disclaimer-section">
              <p><em>Disclaimer: {result.disclaimer}</em></p>
            </div>

            <button className="reset-btn" onClick={handleReset}>
              Check Another Message
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
