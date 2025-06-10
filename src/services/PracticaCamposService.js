const { practicaCampos } = require('../models'); 
async function crearLineasSeparadas(idPractica, lineas) {
  const lineasParaInsertar = lineas.map((linea, index) => ({
    idPractica,
    linea: linea.texto,
    orden: index + 1,
    editable: linea.editable
  }));

  return await practicaCampos.bulkCreate(lineasParaInsertar);
}

async function editarLineas(lineas) {
  const resultados = [];

  for (const linea of lineas) {
    const { id, texto, editable } = linea;

    // Verificamos si existe
    const existente = await practicaCampos.findByPk(id);
    if (!existente) {
      resultados.push({ id, actualizado: false, motivo: 'No existe en la base de datos' });
      continue;
    }

    // Actualizamos si existe
    const actualizado = await practicaCampos.update(
      { linea: texto, editable },
      { where: { id } }
    );

    resultados.push({ id, actualizado: actualizado[0] > 0 });
  }

  return resultados;
}

async function obtenerLineasDePractica(idPractica) {
  const lineas = await practicaCampos.findAll({
    where: { idPractica },
    order: [['id', 'ASC']],
    attributes: ['id', ['linea', 'texto'], 'editable', 'orden']
  });

  return lineas;
}



module.exports = {
  crearLineasSeparadas,
  editarLineas,
  obtenerLineasDePractica
};
