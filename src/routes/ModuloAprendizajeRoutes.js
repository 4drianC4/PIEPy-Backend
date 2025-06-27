const express = require('express');
const router = express.Router();
const moduloAprendizajeController = require('../controllers/ModuloAprendizajeController');

router.get('/', moduloAprendizajeController.getAllModulos);
router.get('/:id', moduloAprendizajeController.getModuloById);
router.post('/', moduloAprendizajeController.createModulo);
router.put('/:id', moduloAprendizajeController.updateModulo);
router.delete('/:id', moduloAprendizajeController.deleteModulo);

module.exports = router;