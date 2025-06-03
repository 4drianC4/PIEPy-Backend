const express = require('express');
const router = express.Router();

const cursoRoutes = require('./CursoRoutes');
const analizadorRoutes = require('./AnalizadorRoutes');
const certificacionRoutes = require('./CertificacionRoutes');
const evaluacionRoutes = require('./EvaluacionRoutes');

router.use('/cursos', cursoRoutes);
router.use('/analizador', analizadorRoutes);
router.use('/certificaciones', certificacionRoutes);
router.use('/evaluaciones', evaluacionRoutes);

module.exports = router;