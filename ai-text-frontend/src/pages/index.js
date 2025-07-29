import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paragraph: text })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('❌ Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: '#1A3365', color: '#fff',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>DetectAI Content</div>
        <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.95rem' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
          <a href="/about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
          <a href="/contact" style={{ color: '#fff', textDecoration: 'none' }}>Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',
        padding: '4rem 2rem', maxWidth: '1200px', margin: 'auto'
      }}>
        {/* Left */}
        <div style={{ flex: '1 1 400px', paddingRight: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111' }}>
            The most trusted AI detector <span style={{
              display: 'inline-block',
              borderBottom: '4px solid #facc15' // yellow underline
            }}>&nbsp;</span>
          </h1>
          <p style={{ marginTop: '1rem', color: '#444', fontSize: '1.1rem' }}>
            DetectAI Content sets the standard in AI content detection with unmatched accuracy in identifying ChatGPT, GPT-4o, Gemini and all known AI models.
          </p>
          <button style={{
            marginTop: '2rem', background: '#FF6A30', color: '#fff',
            border: 'none', padding: '0.8rem 1.5rem', fontSize: '1rem',
            borderRadius: '6px', cursor: 'pointer'
          }}>
            ⚡ Get started free
          </button>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>No credit card required</p>
        </div>

        {/* Right */}
        <div style={{
          flex: '1 1 400px', marginTop: '2rem', background: '#f9fafb',
          borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '1.5rem'
        }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: '600' }}>Was this text written by a human or AI?</h3>
          {/* Sample tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {['ChatGPT', 'Gemini', 'Claude', 'LLAMA', 'Human + AI', 'Human'].map((tab, idx) => (
              <button key={idx} style={{
                padding: '0.3rem 0.8rem',
                fontSize: '0.85rem',
                border: idx===0 ? '2px solid #2563eb' : '1px solid #ccc',
                borderRadius: '999px',
                background: idx===0 ? '#2563eb' : '#fff',
                color: idx===0 ? '#fff' : '#333',
                cursor: 'pointer'
              }}>{tab}</button>
            ))}
          </div>
          <textarea
            rows="6"
            placeholder="Paste your text here..."
            value={text}
            onChange={e=>setText(e.target.value)}
            style={{
              width: '100%', padding: '0.8rem', fontSize: '1rem',
              border: '1px solid #ccc', borderRadius: '8px',
              resize: 'vertical', marginBottom: '1rem'
            }}
          ></textarea>
          <button
            onClick={handlePredict}
            disabled={loading || !text.trim()}
            style={{
              width: '100%', padding: '0.8rem', fontSize: '1rem',
              background: loading ? '#ccc' : '#2563eb',
              color: '#fff', border: 'none', borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}>
            {loading ? '🔍 Checking...' : '➕ Check AI score'}
          </button>
          {result && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <h4 style={{ fontWeight:'600' }}>
                Prediction: {result.prediction === 1 ? <span style={{color:'#E94F37'}}>🦾 AI-generated</span> : <span style={{color:'#27ae60'}}>👤 Human-written</span>}
              </h4>
              <p style={{ fontSize: '0.9rem' }}>AI content probability: {(result.probabilities[1]*100).toFixed(2)}%</p>
              <p style={{ fontSize: '0.9rem' }}>Human content probability: {(result.probabilities[0]*100).toFixed(2)}%</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
