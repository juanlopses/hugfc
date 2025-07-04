const express = require('express');
const { InferenceClient } = require('@huggingface/inference');

const app = express();
const PORT = 3000;

// Token de Hugging Face (solo para desarrollo o entorno seguro)
const hf = new InferenceClient('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');

// Ruta principal
app.get('/', (req, res) => {
  res.send('✅ API NSFW lista. Usa /generate-nsfw?prompt=una_descripcion');
});

// Endpoint GET para generar imagen
app.get('/generate-nsfw', async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Falta el parámetro "prompt".' });
  }

  try {
    const result = await hf.textToImage({
      model: 'Heartsync/NSFW-Uncensored',
      provider: 'auto',
      inputs: prompt,
    });

    console.log('\n🎯 Prompt:', prompt);
    console.log('🖼️ Imagen generada:', result);

    res.json({
      prompt,
      result,
    });
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      error: 'Error generando imagen',
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});
