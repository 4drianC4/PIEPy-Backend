const certificacionService = require("../services/SeccionService");

module.exports = {
  async createSeccion(req, res) {
    try {
      const seccionData = req.body;
      const result = await SeccionService.createSeccion(seccionData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al crear los contenidos",
        error: error.message,
      });
    }
  },
};
