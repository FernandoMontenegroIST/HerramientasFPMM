// Importar express
const express = require('express');

// Crear la app de express
const app = express();

app.use(express.json());

const libros = [
  {lib_id: 1, lib_titulo: "Chainsaw-man", lib_autor: "Tatsuki Fujimoto"},
  {lib_id: 2, lib_titulo: "Berserk", lib_autor: "Kentaro Miura"},
  {lib_id: 3, lib_titulo: "Monster", lib_autor: "Naoki Urasawa"}
]

app.post('/agregar_libros', (req, res) => {
  const { lib_id, lib_titulo, lib_autor } = req.body;
  const libro = { lib_id, lib_titulo, lib_autor };
  libros.push(libro);
  res.status(201).json(libros);
});

app.post('/libros', (req, res) => {
  const { lib_id_post } = req.body;

  const libro = libros.find(l => l.lib_id === lib_id_post);

  if (libro) {
    res.status(201).json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});




app.get('/libros', (req, res) => {
  res.status(201).json(libros);
});



// Escuchar en un puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
