"use strict";

module.exports = (sequelize, DataTypes) => {
  const CursoAlumno = sequelize.define(
    "CursoAlumno",
    {
      idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Curso",
          key: "id",
        },
      },
      idAlumno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Alumno",
          key: "id",
        },
      },
      Estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "CursoAlumno",
      timestamps: false,
    }
  );

  CursoAlumno.associate = function (models) {
    CursoAlumno.belongsTo(models.Curso, {
      foreignKey: "idCurso",
      as: "curso",
    });

    CursoAlumno.belongsTo(models.Alumno, {
      foreignKey: "idAlumno",
      as: "alumno",
    });
  };

  return CursoAlumno;
};
