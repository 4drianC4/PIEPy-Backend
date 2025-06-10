const { practicas } = require('../models');

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
  return await practicas.create({
    titulo: data.titulo || null,
    contenido: data.contenido
  });
}

module.exports = {
  getAllPracticas,
  getPracticaById,
  createPractica,
};
