
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
