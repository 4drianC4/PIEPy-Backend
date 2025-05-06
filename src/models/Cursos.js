"use strict";

module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define(
    "Curso",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idCertificacion: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: "Certificacion",
          key: "id",
        },
      },
      idEvaluacion: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: "Evaluacion",
          key: "id",
        },
      },
    },
    {
      tableName: "curso",
      timestamps: false,
    }
  );

  Curso.associate = function (models) {
    Curso.belongsTo(models.Certificacion, {
      foreignKey: "idCertificacion",
      as: "certificacion",
    });

    Curso.belongsTo(models.Evaluacion, {
      foreignKey: "idEvaluacion",
      as: "evaluacion",
    });
  };

  return Curso;
};
