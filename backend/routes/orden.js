// routes/ordenes.js
const express = require('express');
const router = express.Router();
const Orden = require('../models/Orden');
const auth = require('../middleware/auth');
const upload = require('../config/upload');

// Obtener todas las órdenes
router.get('/', auth, async (req, res) => {
  try {
    const ordenes = await Orden.find().sort({ fechaPublicacion: -1 });
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
});

// Subir nueva orden
router.post('/', [auth, upload.single('archivo')], async (req, res) => {
  try {
    const { titulo } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'El archivo PDF es requerido' });
    }

    const orden = new Orden({
      titulo,
      archivo: req.file.path,
      fechaPublicacion: Date.now()
    });

    await orden.save();
    res.status(201).json(orden);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear orden' });
  }
});

module.exports = router;