import React, { useState } from 'react';
import './styles.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      setResponse(data.reply);
      setMessage('');
    } catch (error) {
      setResponse('⚠️ Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🎓 Career Coach AI</h1>
      <textarea
        placeholder="Ask a career question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask Coach'}
      </button>
      <div className="response">{response}</div>
    </div>
  );
}

export default App;
