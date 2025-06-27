const express = require('express');
const router = express.Router();
const certificacionController = require('../controllers/CertificacionController');

router.get('/', certificacionController.getAllCertificaciones);
router.get('/:id', certificacionController.getCertificacionById);
router.post('/', certificacionController.createCertificacion);
router.put('/:id', certificacionController.updateCertificacion);
router.delete('/:id', certificacionController.deleteCertificacion);

module.exports = router;