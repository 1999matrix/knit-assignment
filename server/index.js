const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const port = process.env.IS_LOCAL ? 3000 : 80;
const KNIT_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTE3NDg3MzY2MDgyMTAwNjQ1NDcyIn0sImlhdCI6MTcwNjg4MTkzNywiZXhwIjoxNzA3OTYxOTM3fQ.AmXXdQDg1UQhXemOFISzbjn8-Q6iRUaGoPKzxP7JS8I";
const KNIT_URL= "https://api.getknit.ai/v1/router/run";

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.post('/generate', async (req, res) => {

  try {
    const { theme, genre } = req.body;

    const messages = [
        {
          role: 'system',
          content: 'You are a helpful Assistant.'
        },
        {
          role: 'user',
          content: `write a lyrics of song with {{theme}} and {{genre}}`
        }
    ];

    const model = {
      name: 'openai/gpt-3.5-turbo'  
    };

    const variables = [
        {
          name: 'theme',
          value: theme
        },
        {
          name: 'genre',
          value: genre
        }
    ];

    const data = {
      messages,
      model,
      variables,
    };
    
    const response = await fetch(KNIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': KNIT_API_KEY
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    res.json(result?.responseText);

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;