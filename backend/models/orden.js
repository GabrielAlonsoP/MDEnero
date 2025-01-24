const mongoose = require('mongoose');

const ordenSchema = new mongoose.Schema({
 titulo: { type: String, required: true },
 archivo: { type: String, required: true },
 fechaPublicacion: { type: Date, default: Date.now },
 activo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Orden', ordenSchema);