const cursoService = require('../services/CursoService');

module.exports = {
    async getAllCursos(req, res) {
        try {
            const cursos = await cursoService.getAllCursos();
            res.status(200).json(cursos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCursoById(req, res) {
        try {
            const curso = await cursoService.getCursoById(req.params.id);
            res.status(200).json(curso);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createCurso(req, res) {
        try {
            const newCurso = await cursoService.createCurso(req.body);
            res.status(201).json(newCurso);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async updateCurso(req, res) {
        try {
            const updatedCurso = await cursoService.updateCurso(req.params.id, req.body);
            res.status(200).json(updatedCurso);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async deleteCurso(req, res) {
        try {
            const deletedCurso = await cursoService.deleteCurso(req.params.id);
            res.status(200).json(deletedCurso);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};