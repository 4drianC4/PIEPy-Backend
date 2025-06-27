const express = require('express');
const router = express.Router();
const analizadorController = require('../controllers/AnalizadorController');

router.post('/', analizadorController.analizarCodigo);

module.exports = router;