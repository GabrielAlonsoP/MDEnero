// backend/routes/pizarra.js
const express = require('express');
const router = express.Router();
const Pizarra = require('../models/Pizarra');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { contenidos } = req.body;
    console.log('Contenidos recibidos en backend:', contenidos);

    // Buscar la pizarra existente o crear una nueva
    let pizarra = await Pizarra.findOne();
    if (!pizarra) {
      pizarra = new Pizarra();
    }

    pizarra.contenidos = contenidos;
    pizarra.autor = req.usuario.id;
    pizarra.fechaActualizacion = Date.now();

    const savedPizarra = await pizarra.save();
    console.log('Pizarra guardada:', savedPizarra);
    
    res.status(201).json(savedPizarra);
  } catch (error) {
    console.error('Error al guardar:', error);
    res.status(500).json({ error: 'Error al actualizar pizarra' });
  }
});
router.get('/', async (req, res) => {
  try {
    const pizarra = await Pizarra.findOne().sort({ fechaActualizacion: -1 });
    console.log('Pizarra recuperada:', pizarra);
    res.json(pizarra);
  } catch (error) {
    console.error('Error al obtener:', error);
    res.status(500).json({ error: 'Error al obtener pizarra' });
  }
});

module.exports = router;