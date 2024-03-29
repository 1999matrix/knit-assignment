import React from 'react'
import { useState } from 'react';

function LyricsForm({ onSubmit }) {

    const [theme, setTheme] = useState('');
    const [genre, setGenre] = useState('');
  
    const handleSubmit = () => {
      onSubmit(theme, genre);
    }
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
          <input 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder='Enter the theme of your song'
          />
    
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}  
            placeholder='Enter the genre of your song'
          />
    
          <button type="submit">Generate Lyrics</button>
        </form>
      )
    }

export default LyricsForm