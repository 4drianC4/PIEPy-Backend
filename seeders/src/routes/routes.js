const express = require('express');
const router = express.Router();

const cursoRoutes = require('./CursoRoutes');

router.use('/cursos', cursoRoutes);

module.exports = router;