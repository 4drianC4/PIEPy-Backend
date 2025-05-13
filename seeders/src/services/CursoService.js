const {cursos, certificaciones, evaluaciones} = require('../models');

module.exports = {
    async getAllCursos() {
        try {
            const cursosList = await cursos.findAll({
                include: [
                    {
                        model: certificacion,
                        as: 'certificacion'
                    },
                    {
                        model: evaluacion,
                        as: 'evaluacion'
                    }
                ]
            });
            return cursosList;
        } catch (error) {
            throw new Error('Error fetching cursos: ' + error.message);
        }
    },

    async getCursoById(id) {
        try {
            const curso = await cursos.findByPk(id, {
                include: [
                    {
                        model: certificaciones,
                        as: 'certificaciones'
                    },
                    {
                        model: evaluaciones,
                        as: 'evaluaciones'
                    }
                ]
            });
            if (!curso) {
                throw new Error('Curso not found');
            }
            return curso;
        } catch (error) {
            throw new Error('Error fetching curso by ID: ' + error.message);
        }
    },

    async createCurso(cursoData) {
        try {
            const newCurso = await cursos.create(cursoData);
            return newCurso;
        } catch (error) {
            throw new Error('Error creating curso: ' + error.message);
        }
    },

    async updateCurso(id, cursoData) {
        try {
            const [updated] = await cursos.update(cursoData, { where: { id } });
            if (!updated) {
                throw new Error('Curso not found');
            }
            return updated;
        } catch (error) {
            throw new Error('Error updating curso: ' + error.message);
        }
    },

    async deleteCurso(id) {
        try {
            const deleted = await cursos.destroy({ where: { id } });
            if (!deleted) {
                throw new Error('Curso not found');
            }
            return deleted;
        } catch (error) {
            throw new Error('Error deleting curso: ' + error.message);
        }
    }
};