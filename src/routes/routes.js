const express = require('express');
const router = express.Router();

const cursoRoutes = require('./CursoRoutes');
const analizadorRoutes = require('./AnalizadorRoutes');

router.use('/cursos', cursoRoutes);
router.use('/analizador', analizadorRoutes);

module.exports = router;