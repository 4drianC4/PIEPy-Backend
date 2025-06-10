const express = require('express');
const router = express.Router();
const practicaCamposController = require('../controllers/PracticaCamposController');

router.post('/', practicaCamposController.crearLineas);
router.put('/:id', practicaCamposController.editarLineas);
router.get('/:idPractica/lineas', practicaCamposController.obtenerLineas);


module.exports = router;