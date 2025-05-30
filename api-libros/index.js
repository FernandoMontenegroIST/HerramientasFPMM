// Importar express
const express = require('express');
const app = express();

app.use(express.json());

let libros = [
  { lib_id: 1, lib_titulo: "Fahrenheit 451", lib_autor: "Ray Bradbury" },
  { lib_id: 2, lib_titulo: "El Resplandor", lib_autor: "Stephen King" },
  { lib_id: 3, lib_titulo: "I Am Legend", lib_autor: "Richard Matheson" }
];


// GET /libros (con filtro opcional por autor)
app.get('/libros', (req, res) => {
  const autor = req.query.autor;
  if (autor) {
    const filtrados = libros.filter(libro => 
      libro.lib_autor.toLowerCase().includes(autor.toLowerCase())
    );
    return res.json(filtrados);
  }
  res.json(libros);
});

// GET /libros/:id
app.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.lib_id === id);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
});

// POST /libros (crear nuevo libro y mostrar la lista actualizada)
app.post('/libros', (req, res) => {
  const { lib_titulo, lib_autor } = req.body;
  if (!lib_titulo || !lib_autor) {
    return res.status(400).json({ error: 'Faltan campos requeridos: lib_titulo y lib_autor' });
  }

  const nuevoLibro = {
    lib_id: libros.length ? libros[libros.length - 1].lib_id + 1 : 1,
    lib_titulo,
    lib_autor
  };
  libros.push(nuevoLibro);
  res.status(201).json(libros);
});

// PUT /libros/:id (actualizar libro y mostrar lista completa)
app.put('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { lib_titulo, lib_autor } = req.body;

  const libro = libros.find(l => l.lib_id === id);
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });

  if (lib_titulo) libro.lib_titulo = lib_titulo;
  if (lib_autor) libro.lib_autor = lib_autor;

  res.json(libros);
});

// DELETE /libros/:id (eliminar libro y mostrar lista completa)
app.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = libros.findIndex(l => l.lib_id === id);

  if (index === -1) return res.status(404).json({ error: 'Libro no encontrado' });

  libros.splice(index, 1);
  res.json(libros);
});

// Escuchar en un puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
