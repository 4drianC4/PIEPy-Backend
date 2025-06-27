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
    },

    /**
     * Obtiene los IDs de cursos que deben estar ocultos para un estudiante
     */
    async getCursosOcultosParaEstudiante(req, res) {
        try {
            const { idAlumno } = req.params;
            
            if (!idAlumno) {
                return res.status(400).json({ 
                    message: 'El ID del alumno es requerido' 
                });
            }

            const cursosOcultosIds = await cursoService.getCursosOcultosParaEstudiante(idAlumno);
            res.status(200).json({
                idAlumno: parseInt(idAlumno),
                cursosOcultos: cursosOcultosIds,
                mensaje: `${cursosOcultosIds.length} cursos están ocultos para este estudiante`
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error obteniendo cursos ocultos',
                error: error.message 
            });
        }
    },

    /**
     * Obtiene cursos disponibles (no ocultos) para un estudiante
     */
    async getCursosDisponiblesParaEstudiante(req, res) {
        try {
            const { idAlumno } = req.params;
            
            if (!idAlumno) {
                return res.status(400).json({ 
                    message: 'El ID del alumno es requerido' 
                });
            }

            const cursosDisponibles = await cursoService.getCursosDisponiblesParaEstudiante(idAlumno);
            res.status(200).json({
                idAlumno: parseInt(idAlumno),
                cursosDisponibles: cursosDisponibles,
                total: cursosDisponibles.length
            });
        } catch (error) {
            res.status(500).json({ 
                message: 'Error obteniendo cursos disponibles',
                error: error.message 
            });
        }
    }
};