const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/CursoController");

router.get("/", cursoController.getAllCursos);
router.get("/:id", cursoController.getCursoById);
router.post("/", cursoController.createCurso);
router.put("/:id", cursoController.updateCurso);
router.delete("/:id", cursoController.deleteCurso);

module.exports = router;
