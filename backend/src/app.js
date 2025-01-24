// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/database');

// Importar rutas
const usuariosRoutes = require('../routes/usuarios');
const personalRoutes = require('../routes/personal');
const ordenesRoutes = require('../routes/orden');
const pizarraRoutes = require('../routes/pizarra');

const app = express();

// Conectar DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/orden', ordenesRoutes);
app.use('/api/pizarra', pizarraRoutes);

// Error handler
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Error del servidor');
});

module.exports = app;