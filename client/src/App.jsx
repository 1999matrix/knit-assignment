import { useState } from 'react';
import LyricsForm  from './LyricsForm';

function App() {

  const [lyrics, setLyrics] = useState('');

  const handleSubmit = async (theme, genre) => {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ theme, genre })
    });
    
    const data = await response.json();
    setLyrics(data);
  }

  return (
    <div>
      <LyricsForm onSubmit={handleSubmit} />
      
      <LyricsDisplay lyrics={lyrics} />
    </div>
  )
}