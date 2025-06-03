const evaluacionService = require('../services/EvaluacionService');

module.exports = {
    async getAllEvaluaciones(req, res) {
        try {
            const evaluaciones = await evaluacionService.getAllEvaluaciones();
            res.status(200).json(evaluaciones);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getEvaluacionById(req, res) {
        try {
            const evaluacion = await evaluacionService.getEvaluacionById(req.params.id);
            res.status(200).json(evaluacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createEvaluacion(req, res) {
        try {
            const newEvaluacion = await evaluacionService.createEvaluacion(req.body);
            res.status(201).json(newEvaluacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async updateEvaluacion(req, res) {
        try {
            const updatedEvaluacion = await evaluacionService.updateEvaluacion(req.params.id, req.body);
            res.status(200).json(updatedEvaluacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async deleteEvaluacion(req, res) {
        try {
            const deletedEvaluacion = await evaluacionService.deleteEvaluacion(req.params.id);
            res.status(200).json(deletedEvaluacion);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};