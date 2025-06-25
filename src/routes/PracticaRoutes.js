const express = require('express');
const router = express.Router();

const practicaController = require('../controllers/PracticaController');

// Obtener todas las prácticas
router.get('/', practicaController.getAllPracticas);

// Obtener una práctica por ID
router.get('/:id', practicaController.getPracticaById);

// Crear una nueva práctica
router.post('/', practicaController.createPractica);


module.exports = router;
