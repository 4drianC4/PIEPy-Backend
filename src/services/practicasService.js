const { practicas } = require('../models');
const practicaCamposService = require('./PracticaCamposService');

async function getAllPracticas() {
  return await practicas.findAll();
}

async function getPracticaById(id) {
  return await practicas.findByPk(id);
}

async function createPractica(data) {
  if (!data.contenido || data.contenido.trim() === '') {
    throw new Error('El contenido es obligatorio');
  }

  // Buscar si ya existe una práctica con el mismo título
  let practica = await practicas.findOne({ where: { titulo: data.titulo } });
  if (practica) {
    // Ya existe, devuelve el objeto existente
    return practica;
  }

  // Si no existe, la crea
  practica = await practicas.create({
    titulo: data.titulo || null,
    contenido: data.contenido
  });
  return practica;
}

  // Crear práctica y líneas en una sola función
async function crearPracticaCompleta({ titulo, contenido, lineas, test }) {
  if (!titulo || !contenido || !Array.isArray(lineas)) {
    throw new Error('Datos incompletos');
  }

  // 1. Crear o buscar la práctica
  const practica = await createPractica({ titulo, contenido });

  // 2. Crear las líneas asociadas a la práctica
  await practicaCamposService.crearLineasSeparadas(practica.id, lineas, test);

  // 3. Retornar la práctica y mensaje
  return { practica, message: 'Práctica y líneas creadas correctamente' };
}

module.exports = {
  getAllPracticas,
  getPracticaById,
  createPractica,
  crearPracticaCompleta
};
