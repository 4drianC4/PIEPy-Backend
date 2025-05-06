"use strict";

module.exports = (sequelize, DataTypes) => {
  const CursoInstructor = sequelize.define(
    "CursoInstructor",
    {
      idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Curso",
          key: "id",
        },
      },
      idInstructor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Instructor",
          key: "id",
        },
      },
    },
    {
      tableName: "CursoInstructor",
      timestamps: false,
    }
  );

  CursoInstructor.associate = function (models) {
    CursoInstructor.belongsTo(models.Curso, {
      foreignKey: "idCurso",
      as: "curso",
    });

    CursoInstructor.belongsTo(models.Instructor, {
      foreignKey: "idInstructor",
      as: "instructor",
    });
  };

  return CursoInstructor;
};
