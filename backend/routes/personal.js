// backend/routes/personal.js
const express = require('express');
const router = express.Router();
const Personal = require('../models/Personal');
const auth = require('../middleware/auth');

// Obtener todo el personal
router.get('/', async (req, res) => {
  try {
    const personal = await Personal.find();
    res.json(personal.map(p => ({
      id: p._id,
      nombre: p.nombre,
      grado: p.grado,
      fechaNacimiento: p.fechaNacimiento,
      foto: `data:${p.foto.contentType};base64,${p.foto.data.toString('base64')}`,
      destacado: p.destacado
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personal' });
  }
});

// Obtener destacados
router.get('/destacados', async (req, res) => {
  try {
    const destacados = await Personal.find({ destacado: true });
    res.json(destacados.map(p => ({
      id: p._id,
      nombre: p.nombre,
      grado: p.grado,
      foto: `data:${p.foto.contentType};base64,${p.foto.data.toString('base64')}`
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener destacados' });
  }
});

// Obtener cumpleañeros
router.get('/cumpleanos', async (req, res) => {
  try {
    const personal = await Personal.find({ destacado: false });
    res.json(personal.map(p => ({
      id: p._id,
      nombre: p.nombre,
      fechaCumple: p.fechaNacimiento,
      foto: `data:${p.foto.contentType};base64,${p.foto.data.toString('base64')}`
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cumpleaños' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    console.log('Datos recibidos en POST:', req.body);
    
    const { nombre, grado, fechaNacimiento, foto, destacado } = req.body;
    
    const personal = new Personal({
      nombre,
      grado: destacado ? grado : undefined, // Solo incluir grado si es destacado
      fechaNacimiento,
      destacado,
      foto: foto ? {
        data: Buffer.from(foto.split(',')[1], 'base64'),
        contentType: foto.split(',')[0].split(':')[1].split(';')[0]
      } : undefined
    });

    const guardado = await personal.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error('Error detallado al guardar:', error);
    res.status(500).json({ error: error.message });
  }
});

// Eliminar personal
router.delete('/:id', auth, async (req, res) => {
  try {
    await Personal.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Personal eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar personal' });
  }
});

module.exports = router;