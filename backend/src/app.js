// backend/src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('../config/database');

// Importar rutas
const usuariosRoutes = require('../routes/usuarios');
const personalRoutes = require('../routes/personal');
const ordenRoutes = require('../routes/orden');
const pizarraRoutes = require('../routes/pizarra');
const parteFuerzaRoutes = require('../routes/ParteFuerza');

const app = express();

// Conectar DB
connectDB();

// Middleware
app.use(cors());

// Aumentar límites ANTES de las rutas
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/orden', ordenRoutes);
app.use('/api/pizarra', pizarraRoutes);
app.use('/api/parte-fuerza', parteFuerzaRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

module.exports = app;