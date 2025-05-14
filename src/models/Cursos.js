"use strict";

module.exports = (sequelize, DataTypes) => {
  const Curso = sequelize.define("cursos",
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
          model: "certificaciones",
          key: "id",
        },
      },
      idEvaluacion: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: "evaluaciones",
          key: "id",
        },
      },
    },
    {
      tableName: "cursos",
      timestamps: false,
    }
  );

  Curso.associate = function (models) {
    Curso.belongsTo(models.certificaciones, {
      foreignKey: "idCertificacion",
      as: "certificaciones",
    });

    Curso.belongsTo(models.evaluaciones, {
      foreignKey: "idEvaluacion",
      as: "evaluaciones",
    });
    
    Curso.hasMany(models.ModuloAprendizajes, { 
      foreignKey: 'idCurso' });
  };
  

  return Curso;
};
