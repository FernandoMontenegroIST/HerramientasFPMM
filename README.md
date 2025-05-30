# HerramientasFPMM

## Tarea Práctica - Herramientas de Desarrollo de Software

Este proyecto forma parte de la materia **Herramientas de Desarrollo de Software** y tiene como objetivo construir una aplicación básica utilizando tecnologías del ecosistema JavaScript, tanto en el frontend como en el backend.

## Funcionalidades implementadas

- Instalación de **Node.js** y **Git**.
- Inicialización del proyecto backend con **Express**.
- Creación de un servidor básico utilizando Express.
- Desarrollo de una API simple para gestión de libros:
  - Uso de un array como base de datos temporal.
  - Implementación del método `POST` para agregar y buscar libros.
- Instalación del entorno frontend con **Vite**.
- Integración de **CORS** en el backend para permitir la conexión con el frontend.
- Conexión exitosa entre frontend y backend.

## Tecnologías utilizadas

- **Backend:** Node.js, Express
- **Frontend:** Vite, HTML/CSS/JavaScript

## Autor

- **Nombre:** Fernando Paúl Montenegro Mora
- **Curso:** 5° "A"


# API de Gestión de Libros

Esta API permite gestionar una colección de libros de ciencia ficción y terror escritos por autores estadounidenses. La API está construida con **Express.js** y expone varios endpoints RESTful para realizar operaciones CRUD.

## 📘 Endpoints

### GET `/libros`
Devuelve la lista completa de libros.  
**Parámetro opcional:** `?autor=<nombre>` para filtrar por autor.

**Ejemplo:**
```
GET /libros
GET /libros?autor=Stephen
```

**Response:**
```json
[
  { "lib_id": 1, "lib_titulo": "Fahrenheit 451", "lib_autor": "Ray Bradbury" },
  { "lib_id": 2, "lib_titulo": "The Shining", "lib_autor": "Stephen King" }
]
```

---

### GET `/libros/:id`
Devuelve un libro específico por su ID.

**Ejemplo:**
```
GET /libros/1
```

**Response:**
```json
{ "lib_id": 1, "lib_titulo": "Fahrenheit 451", "lib_autor": "Ray Bradbury" }
```

**Si no existe:**
```json
{ "error": "Libro no encontrado" }
```

---

### POST `/libros`
Crea un nuevo libro.  
**Body requerido (JSON):**

```json
{
  "lib_titulo": "Nuevo libro",
  "lib_autor": "Nombre del autor"
}
```

**Response:**
```json
[
  { "lib_id": 1, "lib_titulo": "Fahrenheit 451", "lib_autor": "Ray Bradbury" },
  ...
  { "lib_id": 6, "lib_titulo": "Nuevo libro", "lib_autor": "Nombre del autor" }
]
```

**Error si faltan campos:**
```json
{ "error": "Faltan campos requeridos: lib_titulo y lib_autor" }
```

---

### PUT `/libros/:id`
Actualiza un libro por ID.  
**Body (JSON):**
```json
{
  "lib_titulo": "Título actualizado",
  "lib_autor": "Autor actualizado"
}
```

**Response:**
Lista completa de libros con los cambios aplicados.

**Si no existe el libro:**
```json
{ "error": "Libro no encontrado" }
```

---

### DELETE `/libros/:id`
Elimina un libro por ID.

**Response:**
Lista completa de libros actualizada.

**Si no existe el libro:**
```json
{ "error": "Libro no encontrado" }
```

---

## 🐳 Comandos Docker

Esta sección explica cómo construir y ejecutar la API de libros usando Docker.

### 🔧 Construir la imagen:
```bash
sudo docker build -t api-libros .
```
**¿Qué hace?**
- `docker build`: Crea una imagen Docker a partir del `Dockerfile` en el directorio actual.
- `-t api-libros`: Le asigna el nombre `api-libros` a la imagen.
- `.`: Usa el directorio actual como contexto de construcción (donde está el `Dockerfile`).

---

### 🚀 Ejecutar el contenedor:
```bash
sudo docker run -d -p 3000:3000 --restart on-failure --name api-libros-container api-libros
```
**¿Qué hace?**
- `docker run`: Crea y ejecuta un contenedor a partir de una imagen.
- `-d`: Ejecuta el contenedor en segundo plano (modo *detached*).
- `-p 3000:3000`: Mapea el puerto 3000 del contenedor al puerto 3000 de tu máquina local.
- `--restart on-failure`: Si el contenedor falla, se reiniciará automáticamente.
- `--name api-libros-container`: Asigna el nombre `api-libros-container` al contenedor.
- `api-libros`: Es el nombre de la imagen previamente construida.

---

### 📋 Ver contenedores en ejecución:
```bash
sudo docker ps
```
Muestra una lista de contenedores que se están ejecutando.

---

### 🛑 Detener el contenedor:
```bash
sudo docker stop api-libros-container
```
Detiene el contenedor llamado `api-libros-container`.

---

### 🧹 Eliminar el contenedor:
```bash
sudo docker rm api-libros-container
```
Elimina el contenedor detenido para poder volver a crearlo desde cero si es necesario.


