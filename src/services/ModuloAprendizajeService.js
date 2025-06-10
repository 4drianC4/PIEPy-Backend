const { ModuloAprendizajes, cursos } = require('../models');

module.exports = {
    async getAllModulos() {
        try {
            const modulosList = await ModuloAprendizajes.findAll({
                include: [
                    {
                        model: cursos,
                        as: 'curso'
                    }
                ]
            });
            return modulosList;
        } catch (error) {
            throw new Error('Error fetching modulos: ' + error.message);
        }
    },

    async getModuloById(id) {
        try {
            const modulo = await ModuloAprendizajes.findByPk(id, {
                include: [
                    {
                        model: cursos,
                        as: 'curso'
                    }
                ]
            });
            if (!modulo) {
                throw new Error('Modulo not found');
            }
            return modulo;
        } catch (error) {
            throw new Error('Error fetching modulo by ID: ' + error.message);
        }
    },

    async createModulo(moduloData) {
        try {
            const newModulo = await ModuloAprendizajes.create(moduloData);
            return newModulo;
        } catch (error) {
            throw new Error('Error creating modulo: ' + error.message);
        }
    },

    async updateModulo(id, moduloData) {
        try {
            const [updated] = await ModuloAprendizajes.update(moduloData, { where: { id } });
            if (!updated) {
                throw new Error('Modulo not found');
            }
            return updated;
        } catch (error) {
            throw new Error('Error updating modulo: ' + error.message);
        }
    },

    async deleteModulo(id) {
        try {
            const deleted = await ModuloAprendizajes.destroy({ where: { id } });
            if (!deleted) {
                throw new Error('Modulo not found');
            }
            return deleted;
        } catch (error) {
            throw new Error('Error deleting modulo: ' + error.message);
        }
    }
};