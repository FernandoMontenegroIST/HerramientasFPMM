import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { pool } from './db.js';
const app = new Hono();
app.get('/saludos', async (c) => {
    const rows = await pool.query('SELECT * FROM saludos');
    return c.json(rows);
});
app.get('/estadisticas', async (c) => {
  try {
    const totalResults = await pool.query('SELECT COUNT(*) AS total FROM saludos');
    const porIdiomaResults = await pool.query(`
      SELECT idioma, COUNT(*) AS cantidad
      FROM saludos
      GROUP BY idioma
    `);

    const total = Number(totalResults[0].total);

    const porIdioma = porIdiomaResults.map(row => ({
      idioma: row.idioma,
      cantidad: Number(row.cantidad)
    }));

    return c.json({
      totalSaludos: total,
      saludosPorIdioma: porIdioma
    });
  } catch (error) {
    console.error(error);
    return c.status(500).json({ error: 'Error en la consulta' });
  }
});

app.get('/saludos/:id', async (c) => {
    const id = c.req.param('id');
    const rows = await pool.query('SELECT * FROM saludos WHERE id = ?', [id]);
    return rows.length ? c.json(rows[0]) : c.notFound();
});
app.post('/saludos', async (c) => {
    const body = await c.req.json();
    const { saludo, idioma } = body;
    const result = await pool.query('INSERT INTO saludos (saludo, idioma) VALUES (?, ?)', [saludo, idioma]);
    return c.json({ id: result.insertId.toString(), saludo, idioma });
});
app.put('/saludos/:id', async (c) => {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { saludo, idioma } = body;
    await pool.query('UPDATE saludos SET saludo = ?, idioma = ? WHERE id = ?', [saludo, idioma, id]);
    return c.text('Saludo actualizado');
});
app.delete('/saludos/:id', async (c) => {
    const id = c.req.param('id');
    await pool.query('DELETE FROM saludos WHERE id = ?', [id]);
    return c.text('Saludo eliminado');
});
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
