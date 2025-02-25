// backend/models/Pizarra.js
const mongoose = require('mongoose');

const pizarraSchema = new mongoose.Schema({
  contenidos: [{
    texto: { type: String, required: true },
    orden: { type: Number, default: 0 }
  }],
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pizarra', pizarraSchema);