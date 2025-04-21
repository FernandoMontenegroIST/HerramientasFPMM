const express = require('express');
const connection = require('./db');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());

app.get('/api/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos de los usuarios' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/pacientes', (req, res) => {
  const sql = 'SELECT * FROM pacientes';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los datos:', error);
      res.status(500).json({ error: 'Error al obtener los datos de los pacientes' });
      return;
    }
    res.json(results);
  });
});

// Método POST para insertar nuevos usuarios
app.post('/api/usuarios', (req, res) => {
  const { nombre, correo, clave, rol } = req.body;

  if (!nombre || !correo || !clave || !rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const sql = `
    INSERT INTO usuarios (usu_nombre, usu_correo, usu_clave, usu_rol, usu_creado_en)
    VALUES (?, ?, ?, ?, NOW())
  `;

  connection.query(sql, [nombre, correo, clave, rol], (error, result) => {
    if (error) {
      console.error('Error al insertar el usuario:', error);
      res.status(500).json({ error: 'Error al insertar el usuario' });
      return;
    }
    res.status(201).json({ mensaje: 'Usuario creado exitosamente', id: result.insertId });
  });
});

app.get('/ping', (req, res) => {
    res.json({data: 'Pong'});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

