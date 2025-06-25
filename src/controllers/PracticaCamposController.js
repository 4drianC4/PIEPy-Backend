const practicaCamposService = require('../services/PracticaCamposService');

async function crearLineas(req, res) {
  try {
    const { idPractica, lineas, test } = req.body;
    if (!idPractica || !lineas || !Array.isArray(lineas)) {
      return res.status(400).json({ error: 'Faltan datos o formato incorrecto' });
    }

    const resultado = await practicaCamposService.crearLineasSeparadas(idPractica, lineas, test);
    res.status(201).json({ message: 'Líneas creadas con éxito', data: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear las líneas' });
  }
}

async function editarLineas(req, res) {
  try {
    const { lineas } = req.body;

    if (!lineas || !Array.isArray(lineas)) {
      return res.status(400).json({ error: 'Formato incorrecto. Se espera un array de líneas.' });
    }

    const resultado = await practicaCamposService.editarLineas(lineas);
    res.status(200).json({ message: 'Líneas actualizadas', data: resultado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar las líneas' });
  }
}

async function obtenerLineas(req, res) {
  try {
    const { idPractica } = req.params;
    const lineas = await practicaCamposService.obtenerLineasDePractica(idPractica);
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las líneas de la práctica' });
  }
}




module.exports = {
  crearLineas,
  editarLineas,
  obtenerLineas
};
