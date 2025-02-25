// backend/models/ParteFuerza.js
const mongoose = require('mongoose');

const parteFuerzaSchema = new mongoose.Schema({
  documentos: [{
    titulo: { type: String, required: true },
    archivo: { type: String, required: true },
    fechaPublicacion: { type: Date, default: Date.now },
    orden: { type: Number }
  }],
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ParteFuerza', parteFuerzaSchema);