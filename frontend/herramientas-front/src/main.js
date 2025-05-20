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
    const response = await fetch('http://13.217.37.120:3000/ping')
    const result = await response.json()
    document.querySelector('#mensaje').innerHTML = '<b>Mensaje: </b>' + result.data
  } catch (error) {
    document.querySelector('#mensaje').innerHTML = '<b>Mensaje: Error al acceder en este momento.</b>'
    console.error('Error:', error)
  }
})
