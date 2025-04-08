// Importar express
const express = require('express');

// Crear la app de express
const app = express();

// Definir una ruta
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Escuchar en un puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
