const express = require('express');
const router = express.Router();
const Personal = require('../models/Personal');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { nombre, grado, fechaNacimiento, foto } = req.body;
    const personal = new Personal({
      nombre,
      grado,
      fechaNacimiento,
      foto: {
        data: Buffer.from(foto.split(',')[1], 'base64'),
        contentType: foto.split(',')[0].split(':')[1].split(';')[0]
      }
    });
    await personal.save();
    res.status(201).json(personal);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear personal' });
  }
});

// routes/personal.js
router.get('/', auth, async (req, res) => {
  try {
    const personal = await Personal.find();
    res.json(personal.map(p => ({
      ...p.toObject(),
      foto: {
        contentType: p.foto.contentType,
        data: p.foto.data.toString('base64')
      }
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personal' });
  }
 });
 
 // Ruta específica para destacados
 router.get('/destacados', auth, async (req, res) => {
  try {
    const destacados = await Personal.find({ destacado: true });
    res.json(destacados.map(p => ({
      ...p.toObject(),
      foto: {
        contentType: p.foto.contentType,
        data: p.foto.data.toString('base64')
      }
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener destacados' });
  }
 });

module.exports = router;