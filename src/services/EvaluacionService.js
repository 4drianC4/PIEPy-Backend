const { evaluaciones } = require('../models');

module.exports = {
    async getAllEvaluaciones() {
        try {
            const evaluacionesList = await evaluaciones.findAll();
            return evaluacionesList;
        } catch (error) {
            throw new Error('Error fetching evaluaciones: ' + error.message);
        }
    },
    async getEvaluacionById(id) {
        try {
            const evaluacion = await evaluaciones.findByPk(id);
            if (!evaluacion) {
                throw new Error('Evaluacion not found');
            }
            return evaluacion;
        } catch (error) {
            throw new Error('Error fetching evaluacion by ID: ' + error.message);
        }
    },
    async createEvaluacion(evaluacionData) {
        try {
            const newEvaluacion = await evaluaciones.create(evaluacionData);
            return newEvaluacion;
        } catch (error) {
            throw new Error('Error creating evaluacion: ' + error.message);
        }
    },
    async updateEvaluacion(id, evaluacionData) {
        try {
            const [updated] = await evaluaciones.update(evaluacionData, { where: { id } });
            if (!updated) {
                throw new Error('Evaluacion not found');
            }
            return await this.getEvaluacionById(id);
        } catch (error) {
            throw new Error('Error updating evaluacion: ' + error.message);
        }
    },
    async deleteEvaluacion(id) {
        try {
            const deleted = await evaluaciones.destroy({ where: { id } });
            if (!deleted) {
                throw new Error('Evaluacion not found');
            }
            return { message: 'Evaluacion deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting evaluacion: ' + error.message);
        }
    }
};