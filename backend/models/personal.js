const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  grado: { type: String, required: true },
  foto: { 
    data: Buffer,
    contentType: String 
  },
  fechaNacimiento: { type: Date },
  destacado: { type: Boolean, default: false }
});

module.exports = mongoose.model('Personal', personalSchema);