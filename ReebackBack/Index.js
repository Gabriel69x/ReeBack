const express = require('express');
const conectarDB = require('./Config/db');
const rutasUsuarios = require('./Rutas/RutaUsuario');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
conectarDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/usuarios', rutasUsuarios);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido al backend de ReeBack.');
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
