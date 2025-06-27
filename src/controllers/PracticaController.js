'use strict';

const practicaService = require('../services/practicasService');
const practicaCamposService = require('../services/PracticaCamposService');

async function getAllPracticas(req, res) {
  try {
    const practicas = await practicaService.getAllPracticas();
    res.json(practicas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getPracticaById(req, res) {
  try {
    const id = req.params.id;
    const practica = await practicaService.getPracticaById(id);
    if (!practica) return res.status(404).json({ message: 'Práctica no encontrada' });
    res.json(practica);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPractica(req, res) {
  try {
    const { titulo, contenido, lineas, test } = req.body;
    if (!titulo || !contenido || !Array.isArray(lineas)) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    // 1. Crear o buscar la práctica
    const practica = await practicaService.createPractica({ titulo, contenido });

    // 2. Crear las líneas asociadas a la práctica
    await practicaCamposService.crearLineasSeparadas(practica.id, lineas, test);

    res.status(201).json({ practica, message: 'Práctica y líneas creadas correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllPracticas,
  getPracticaById,
  createPractica
};
