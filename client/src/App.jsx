import { useState } from 'react';
import LyricsForm  from './LyricsForm';
import LyricsDisplay from './LyricsDisplay';
import './App.css'; 

export default function App() {

  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (theme, genre) => {
    setLoading(true);
    try{
      const response = await fetch('http://localhost:3000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ theme, genre })
    });    
    const data = await response.json();
    setLyrics(data);}catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }

  if(loading) return (<>loading...</>);

  return (
    <div className="App">
      <LyricsForm onSubmit={handleSubmit} />      
      <LyricsDisplay className="LyricsDisplay" lyrics={lyrics} />
    </div>
  )
}