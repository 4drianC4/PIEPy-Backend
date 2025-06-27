const express = require("express");
const router = express.Router();

const seccion = require("../controllers/SeccionController");

router.post("/", seccion.createSeccion);

module.exports = router;
