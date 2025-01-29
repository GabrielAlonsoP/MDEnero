// backend/config/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate que esta carpeta exista
  },
  filename: (req, file, cb) => {
    // Usar timestamp para evitar nombres duplicados
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;