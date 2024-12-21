const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../Models/ModeloUsuario');
const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registro', async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe.' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario.', error });
  }
});


// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    // Validar la contraseña
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso.', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error });
  }
});

module.exports = router;
