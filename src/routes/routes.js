const express = require("express");
const router = express.Router();

const cursoRoutes = require("./CursoRoutes");
const moodleRoutes = require("./MoodleRoutes");
const loginRoutes = require("./LoginRoutes");

router.use("/cursos", cursoRoutes);
router.use("/moodle", moodleRoutes);
router.use("/auth", loginRoutes);
module.exports = router;
