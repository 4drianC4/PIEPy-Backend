const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/CursoController');

router.get('/', cursoController.getAllCursos);

// Rutas específicas para filtrado por estudiante (DEBEN IR ANTES de /:id)
router.get('/ocultos/:idAlumno', cursoController.getCursosOcultosParaEstudiante);
router.get('/disponibles/:idAlumno', cursoController.getCursosDisponiblesParaEstudiante);

// Rutas para manejar casos sin idAlumno - devuelven 404
router.get('/ocultos/', (req, res) => {
    res.status(404).json({ message: 'ID de alumno requerido' });
});
router.get('/disponibles/', (req, res) => {
    res.status(404).json({ message: 'ID de alumno requerido' });
});

// Ruta genérica (DEBE IR DESPUÉS de las rutas específicas)
router.get('/:id', cursoController.getCursoById);

router.post('/', cursoController.createCurso);
router.put('/:id', cursoController.updateCurso);
router.delete('/:id', cursoController.deleteCurso);

module.exports = router;