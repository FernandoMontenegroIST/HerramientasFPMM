const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(cors())

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({data: 'Pong Montenegro'});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

