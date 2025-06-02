const express = require('express');
const router = express.Router();

const cursoRoutes = require('./CursoRoutes');
const analizadorRoutes = require('./AnalizadorRoutes');
const moduloAprendizajeRoutes = require('./ModuloAprendizajeRoutes');
const practicaRoutes = require('./PracticaRoutes');

router.use('/cursos', cursoRoutes);
router.use('/analizador', analizadorRoutes);
router.use('/modulos-aprendizaje', moduloAprendizajeRoutes);
router.use('/practicas', practicaRoutes); 

module.exports = router;