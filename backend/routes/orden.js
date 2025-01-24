const express = require('express');
const router = express.Router();
const Orden = require('../models/Orden');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', auth, async (req, res) => {
 try {
   const ordenes = await Orden.find().sort({ fechaPublicacion: -1 });
   res.json(ordenes);
 } catch (error) {
   res.status(500).json({ error: 'Error al obtener órdenes' });
 }
});

router.post('/', [auth, upload.single('archivo')], async (req, res) => {
 try {
   const { titulo } = req.body;
   const orden = new Orden({
     titulo,
     archivo: req.file.path
   });
   await orden.save();
   res.status(201).json(orden);
 } catch (error) {
   res.status(500).json({ error: 'Error al crear orden' });
 }
});

module.exports = router;