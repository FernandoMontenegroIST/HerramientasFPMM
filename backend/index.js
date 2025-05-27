const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000;

const libros = [
  {lib_id: 1, lib_titulo: "Chainsaw-man", lib_autor: "Tatsuki Fujimoto"},
  {lib_id: 2, lib_titulo: "Berserk", lib_autor: "Kentaro Miura"},
  {lib_id: 3, lib_titulo: "Monster", lib_autor: "Naoki Urasawa"}
]

app.use(cors())

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({data: 'Pong - FPMM'});
});

app.post('/agregar_libros', (req, res) => {
  const { lib_id, lib_titulo, lib_autor } = req.body;
  const libro = { lib_id, lib_titulo, lib_autor };
  libros.push(libro);
  res.status(201).json(libros);
});


app.get('/examen', (req, res) => {
  res.json({data: 'Hola Mundo!'});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

