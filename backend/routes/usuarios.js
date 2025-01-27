const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const auth = require('../middleware/auth');

router.post('/registro', async (req, res) => {
 try {
  console.log('Datos recibidos', req.body);
   const { nombre, usuario, password } = req.body;
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   
   const nuevoUsuario = new Usuario({
     nombre,
     usuario,
     password: hashedPassword
   });

   await nuevoUsuario.save();
   res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
 } catch (error) {
  console.error('Error detallado', error);
   res.status(500).json({ error: 'Error al crear usuario' });
 }
});

// Modificar la respuesta del login
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ usuario });
    console.log('Usuario encontrado:', user);  // Log del usuario
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password válido:', validPassword);  // Log de validación
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('Token generado:', { token, rol: user.rol });  // Log de respuesta
    res.json({ token, rol: user.rol });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en login' });
  }
});

module.exports = router;