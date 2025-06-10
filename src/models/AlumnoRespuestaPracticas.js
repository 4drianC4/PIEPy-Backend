'use strict';

module.exports = (sequelize, DataTypes) => {
  const AlumnoRespuestaPracticas = sequelize.define('alumnoRespuestaPracticas', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idAlumno: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPractica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idCampo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    respuesta: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    resultadoEjecucion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'alumnorespuestapracticas',
    timestamps: false
  });

  AlumnoRespuestaPracticas.associate = function(models) {
    AlumnoRespuestaPracticas.belongsTo(models.alumnos, {
      foreignKey: 'idAlumno',
      as: 'alumnos',
      onDelete: 'CASCADE'
    });

    AlumnoRespuestaPracticas.belongsTo(models.practicas, {
      foreignKey: 'idPractica',
      as: 'practica',
      onDelete: 'CASCADE'
    });

    AlumnoRespuestaPracticas.belongsTo(models.practicaCampos, {
      foreignKey: 'idCampo',
      as: 'campo',
      onDelete: 'CASCADE'
    });
  };

  return AlumnoRespuestaPracticas;
};
