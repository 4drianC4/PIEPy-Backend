const express = require("express");
const router = express.Router();

const moodleRoutes = require("./MoodleRoutes");
const loginRoutes = require("./LoginRoutes");
const cursoRoutes = require("./CursoRoutes");
const analizadorRoutes = require("./AnalizadorRoutes");
const certificacionRoutes = require("./CertificacionRoutes");
const evaluacionRoutes = require("./EvaluacionRoutes");
const moduloAprendizajeRoutes = require("./ModuloAprendizajeRoutes");
const practicaRoutes = require("./PracticaRoutes");
const practicaCamposRoutes = require("./PracticaCamposRoutes");

router.use("/cursos", cursoRoutes);
router.use("/analizador", analizadorRoutes);
router.use("/certificaciones", certificacionRoutes);
router.use("/evaluaciones", evaluacionRoutes);
router.use("/modulos-aprendizaje", moduloAprendizajeRoutes);
router.use("/practicas", practicaRoutes);
router.use("/practica-campos", practicaCamposRoutes);
router.use("/moodle", moodleRoutes);
router.use("/auth", loginRoutes);

module.exports = router;
