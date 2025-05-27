const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.registrarAlumno);

router.post("/login", AuthController.loginAlumno);

module.exports = router;
