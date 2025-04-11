// Importar express
const express = require('express');

// Crear la app de express
const app = express();

app.use(express.json());

// Definir una ruta
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.post('/ping', (req, res) => {
  const { data } = req.body;
  if (data == "ping") {
    res.status(201).json({ data: 'pong'});
  } else {
    res.status(500).json({ error: 'Error de data' });
  }
});

// Escuchar en un puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
