
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

const OPENAI_API_KEY = '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';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/generate-image', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    const data = await response.json();
    res.json({ imageUrl: data.data[0].url });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao gerar imagem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
