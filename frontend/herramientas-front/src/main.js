import './style.css'

document.querySelector('#app').innerHTML = `
  <h1>Ping al web service:</h1>
  <div class='card' id='mensaje'>
    <b>Mensaje: </b>
  </div>
  <button id='btn_ping'>Boton</button>
`

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