import React from 'react'
import { useState } from 'react';

function LyricsForm({ onSubmit }) {

    const [theme, setTheme] = useState('');
    const [genre, setGenre] = useState('');
  
    const handleSubmit = () => {
      onSubmit(theme, genre);
    }
    return (
        <form onSubmit={handleSubmit}>
          <input 
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
    
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}  
          />
    
          <button type="submit">Generate Lyrics</button>
        </form>
      )
    }

export default LyricsForm