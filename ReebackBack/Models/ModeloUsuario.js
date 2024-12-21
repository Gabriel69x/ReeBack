const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor ingresa un correo válido'],
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  fechaCreacion: { 
    type: Date,
    default: Date.now,
  },
});

/*Encriptar la contraseña antes de guardar
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contraseña')) return next();
  this.contraseña = await bcrypt.hash(this.contraseña, 10);
  next();
});
*/


// Comparar contraseñas
UsuarioSchema.methods.compararContraseña = function (contraseña) {
  return bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('RutaUsuario', UsuarioSchema);
