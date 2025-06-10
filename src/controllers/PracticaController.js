'use strict';

const practicaService = require('../services/practicasService');

module.exports = {
  async getAllPracticas(req, res) {
    try {
      const practicas = await practicaService.getAllPracticas();
      res.json(practicas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPracticaById(req, res) {
    try {
      const id = req.params.id;
      const practica = await practicaService.getPracticaById(id);
      if (!practica) return res.status(404).json({ message: 'Práctica no encontrada' });
      res.json(practica);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createPractica(req, res) {
    try {
      const data = req.body;
      const nuevaPractica = await practicaService.createPractica(data);
      res.status(201).json(nuevaPractica);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
