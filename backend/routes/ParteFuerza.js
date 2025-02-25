// backend/routes/parteFuerza.js
const express = require('express');
const router = express.Router();
const ParteFuerza = require('../models/ParteFuerza');
const auth = require('../middleware/auth');
const upload = require('../config/upload');

// Ruta pública para obtener documentos
// backend/routes/parteFuerza.js
// Ruta para obtener documentos
router.get('/', async (req, res) => {
  try {
    const partes = await ParteFuerza.findOne()
      .sort({ fechaActualizacion: -1 });
    res.json(partes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener partes' });
  }
});

// Ruta para subir documentos (accesible para todos)
router.post('/', upload.single('archivo'), async (req, res) => {
  try {
    const { titulo } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'El archivo PDF es requerido' });
    }

    let parteFuerza = await ParteFuerza.findOne();
    if (!parteFuerza) {
      parteFuerza = new ParteFuerza({ documentos: [] });
    }

    parteFuerza.documentos.push({
      titulo,
      archivo: req.file.path,
      fechaPublicacion: Date.now()
    });

    await parteFuerza.save();
    res.status(201).json(parteFuerza);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear parte' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let parteFuerza = await ParteFuerza.findOne();
    if (parteFuerza) {
      // Filtrar el documento específico
      parteFuerza.documentos = parteFuerza.documentos.filter(
        doc => doc._id.toString() !== req.params.id
      );
      await parteFuerza.save();
      res.json({ mensaje: 'Documento eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'No se encontró el documento' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar documento' });
  }
});

module.exports = router;