const express = require("express");
const router = express.Router();
const { procesarAccion } = require("../controllers/MoodleController");

router.post("/", procesarAccion);

module.exports = router;
