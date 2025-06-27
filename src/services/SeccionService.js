const { contenidos } = require("../models");

module.exports = {
  async createSeccion(seccionData) {
    try {
      if (!seccionData.idCursos) {
        throw new Error(
          "El campo idCursos es obligatorio para crear contenidos."
        );
      }

      const cursoExistente = await cursos.findByPk(seccionData.idCursos);
      if (!cursoExistente) {
        throw new Error("El curso especificado no existe.");
      }

      if (seccionData.contenidos && seccionData.contenidos.length > 0) {
        for (const contenido of seccionData.contenidos) {
          await contenidos.create({
            ...contenido,
            idCursos: seccionData.idCursos,
          });
        }
      }

      return { mensaje: "Contenidos creados exitosamente." };
    } catch (error) {
      throw new Error("Error creando contenidos: " + error.message);
    }
  },
};
