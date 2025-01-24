const mongoose = require('mongoose');

const pizarraSchema = new mongoose.Schema({
 contenido: { type: String, required: true },
 autor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
 fechaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pizarra', pizarraSchema);