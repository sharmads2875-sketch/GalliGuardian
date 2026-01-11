import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiQuestion, setAiQuestion] = useState('');
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    // Show disclaimer on first visit
    const disclaimerDismissed = localStorage.getItem('disclaimerDismissed');
    if (disclaimerDismissed) {
      setShowDisclaimer(false);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB.');
      return;
    }

    setError(null);
    setImage(file);
    setResult(null);
    setAiQuestion('');

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server returned an error.');

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        if (data.image_preview) setPreview(data.image_preview);
        // Mock AI question based on threat level
        setAiQuestion(getMockQuestion(data.threat_level));
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server. Make sure FastAPI is running.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getMockQuestion = (threatLevel) => {
    switch (threatLevel) {
      case 'high':
        return 'Is the animal showing signs of aggression or distress?';
      case 'medium':
        return 'Can you safely observe the animal from a distance?';
      case 'low':
        return 'Does the animal appear to be injured or in need of immediate care?';
      default:
        return 'What behavior is the animal displaying?';
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setAiQuestion('');
    const fileInput = document.getElementById('image-input');
    if (fileInput) fileInput.value = '';
  };

  const handleDismissDisclaimer = () => {
    setShowDisclaimer(false);
    localStorage.setItem('disclaimerDismissed', 'true');
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'high': return '#d32f2f';
      case 'medium': return '#f57c00';
      case 'low': return '#388e3c';
      default: return '#757575';
    }
  };

  const getThreatIcon = (level) => {
    switch (level) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '✅';
      default: return '❓';
    }
  };

  const getChecklistItems = (level) => {
    switch (level) {
      case 'high':
        return [
          'Emergency! Stay safe and alert nearby vet',
          'Do not approach the animal directly',
          'Keep a safe distance at all times',
          'Alert others in the vicinity',
        ];
      case 'medium':
        return [
          'Contact local NGO for assistance',
          'Monitor the situation from a distance',
          'Do not attempt to handle the animal',
          'Provide location details to authorities',
        ];
      case 'low':
        return [
          'Safe to provide first aid at home',
          'Approach cautiously and observe',
          'Ensure your safety first',
          'Seek professional help if needed',
        ];
      default:
        return [];
    }
  };

  return (
    <div className="home-page">
      <div className="pattern-background">
        <div className="animated-paw"></div>
      </div>

      {showDisclaimer && (
        <div className="disclaimer-modal">
          <div className="disclaimer-content">
            <h3>⚠️ Safety Reminder</h3>
            <p>Do not approach the animal directly. Stay safe and alert.</p>
            <button onClick={handleDismissDisclaimer} className="disclaimer-button">
              I Understand
            </button>
          </div>
        </div>
      )}

      <div className="container">
        <header>
          <h1>GalliGuardian</h1>
          <p>AI-Powered Decision Support System</p>
        </header>

        <div className="upload-section">
          {preview ? (
            <div className="image-preview-small">
              <img src={preview} alt="Preview" />
              <button onClick={handleReset} className="remove-btn">Remove</button>
            </div>
          ) : (
            <label htmlFor="image-input" className="upload-label">
              <p>Click to upload or drag and drop (Max 10MB)</p>
            </label>
          )}
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {error && <div className="error-message">{error}</div>}

          <div className="ai-question-box">
            <label htmlFor="ai-question">Let's look into the situation together</label>
            <textarea
              id="ai-question"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              placeholder="Describe what you see or ask questions about the uploaded image..."
              rows="3"
            />
          </div>

          <button 
            onClick={handleUpload} 
            disabled={!image || loading}
            className="analyze-button"
          >
            {loading ? 'Analyzing...' : 'Analyze Threat Level'}
          </button>
        </div>

        {result && (
          <div className="result-section">
            <div
              className="threat-result"
              style={{
                border: `2px solid ${getThreatColor(result.threat_level)}`,
              }}
            >
              <span className="threat-icon">{getThreatIcon(result.threat_level)}</span>
              <div className="threat-info">
                <div>
                  Threat Level: <strong>{result.threat_level.toUpperCase()}</strong>
                </div>
                <div>
                  Confidence: {Math.round(result.confidence * 100)}%
                </div>
              </div>
            </div>

            <div className="checklist-section">
              <h3>Action Checklist</h3>
              <ul className="action-checklist">
                {getChecklistItems(result.threat_level).map((item, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={handleReset} className="secondary-button">
              Analyze Another Image
            </button>
          </div>
        )}
      </div>

      <div className="bottom-navigation">
        <button className="nav-icon-btn" onClick={() => navigate('/legal')}>
          <span className="nav-icon">⚖️</span>
          <span className="nav-label">Legal Help</span>
        </button>
        <button className="nav-icon-btn" onClick={() => navigate('/ngo')}>
          <span className="nav-icon">📍</span>
          <span className="nav-label">NGO Support</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
