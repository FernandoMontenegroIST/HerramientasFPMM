import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Ping al web service:</h1>
  <div class='card' id='mensaje'>
    <b>Mensaje: </b>
  </div>
  <button id='btn_ping'>Boton</button>
  <div id="tabla_pacientes"></div>

`

// document.querySelector('#pacientes').innerHTML = `
//   <div id="tabla_pacientes"></div>
// `


document.querySelector('#btn_ping').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/ping')
    const result = await response.json()
    document.querySelector('#mensaje').innerText = 'Mensaje: ' + result.data
  } catch (error) {
    document.querySelector('#mensaje').innerText = 'Mensaje: Error al conectar'
    console.error('Error:', error)
  }
})

document.addEventListener('DOMContentLoaded', () => {
  cargarPacientes();
});

async function cargarPacientes() {
  try {
    const response = await fetch('http://localhost:3000/api/pacientes')
    const pacientes = await response.json()

    const tablaHTML = `
      <h2>Listado de Pacientes</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          ${pacientes.map(p => `
            <tr>
              <td>${p.pac_id}</td>
              <td>${p.pac_nombre}</td>
              <td>${p.pac_dni}</td>
              <td>${p.pac_telefono}</td>
              <td>${p.pac_correo}</td>
              <td>${p.pac_sexo}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
    document.querySelector('#tabla_pacientes').innerHTML = tablaHTML
  } catch (error) {
    document.querySelector('#tabla_pacientes').innerHTML = '<p>Error al cargar los pacientes.</p>'
    console.error('Error al obtener pacientes:', error)
  }
}
