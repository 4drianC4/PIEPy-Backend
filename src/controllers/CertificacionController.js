const certificacionService = require('../services/CertificacionService');

module.exports = {
    async getAllCertificaciones(req, res) {
        try {
            const certificaciones = await certificacionService.getAllCertificaciones();
            res.status(200).json(certificaciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async getCertificacionById(req, res) {
        try {
            const certificacion = await certificacionService.getCertificacionById(req.params.id);
            res.status(200).json(certificacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async createCertificacion(req, res) {
        try {
            const newCertificacion = await certificacionService.createCertificacion(req.body);
            res.status(201).json(newCertificacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updateCertificacion(req, res) {
        try {
            const updatedCertificacion = await certificacionService.updateCertificacion(req.params.id, req.body);
            res.status(200).json(updatedCertificacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteCertificacion(req, res) {
        try {
            const deletedCertificacion = await certificacionService.deleteCertificacion(req.params.id);
            res.status(200).json(deletedCertificacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};