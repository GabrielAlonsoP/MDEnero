const express = require('express');
const router = express.Router();
const Pizarra = require('../models/Pizarra');
const auth = require('../middleware/auth');

// Modificar la ruta GET para que no requiera autenticación
router.get('/', async (req, res) => {
  try {
    const pizarra = await Pizarra.findOne().sort({ fechaActualizacion: -1 });
    res.json(pizarra);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pizarra' });
  }
});

router.post('/', auth, async (req, res) => {
 try {
   const { contenido } = req.body;
   const pizarra = new Pizarra({
     contenido,
     autor: req.usuario.id
   });
   await pizarra.save();
   res.status(201).json(pizarra);
 } catch (error) {
   res.status(500).json({ error: 'Error al actualizar pizarra' });
 }
});

module.exports = router;