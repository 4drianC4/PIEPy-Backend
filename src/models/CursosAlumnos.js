"use strict";

module.exports = (sequelize, DataTypes) => {
  const CursosAlumnos = sequelize.define(
    "CursosAlumnos",
    {
      idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "cursos",
          key: "id",
        },
      },
      idAlumno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "alumnos",
          key: "id",
        },
      },
      Estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "cursosAlumnos",
      timestamps: false,
    }
  );

  CursosAlumnos.associate = function (models) {
    CursosAlumnos.belongsTo(models.cursos, {
      foreignKey: "idCurso",
      as: "cursos",
    });

    CursosAlumnos.belongsTo(models.alumnos, {
      foreignKey: "idAlumno",
      as: "alumnos",
    });
  };

  return CursosAlumnos;
};
