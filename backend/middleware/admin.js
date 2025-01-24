const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 try {
   const token = req.header('Authorization').replace('Bearer ', '');
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   if (decoded.rol !== 'admin') {
     return res.status(403).json({ error: 'Acceso denegado' });
   }
   req.usuario = decoded;
   next();
 } catch (error) {
   res.status(401).json({ error: 'Token inválido' });
 }
};