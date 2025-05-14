const express = require('express');
const router = express.Router();

const cursoRoutes = require('./CursoRoutes');
const analizadorRoutes = require('./AnalizadorRoutes');
const moduloAprendizajeRoutes = require('./ModuloAprendizajeRoutes');

router.use('/cursos', cursoRoutes);
router.use('/analizador', analizadorRoutes);
router.use('/modulos-aprendizaje', moduloAprendizajeRoutes);
module.exports = router;