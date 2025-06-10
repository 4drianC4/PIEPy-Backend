const moduloAprendizajeService = require('../services/moduloAprendizajeService');

module.exports = {
    async getAllModulos(req, res) {
        try {
            const modulos = await moduloAprendizajeService.getAllModulos();
            res.status(200).json(modulos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getModuloById(req, res) {
        try {
            const { id } = req.params;
            const modulo = await moduloAprendizajeService.getModuloById(id);
            res.status(200).json(modulo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async createModulo(req, res) {
        try {
            const moduloData = req.body;
            const newModulo = await moduloAprendizajeService.createModulo(moduloData);
            res.status(201).json(newModulo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async updateModulo(req, res) {
        try {
            const { id } = req.params;
            const moduloData = req.body;
            const updated = await moduloAprendizajeService.updateModulo(id, moduloData);
            res.status(200).json({ message: 'Modulo updated successfully', updated });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    async deleteModulo(req, res) {
        try {
            const { id } = req.params;
            await moduloAprendizajeService.deleteModulo(id);
            res.status(200).json({ message: 'Modulo deleted successfully' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
};