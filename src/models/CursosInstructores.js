"use strict";

module.exports = (sequelize, DataTypes) => {
  const CursosInstructores = sequelize.define("cursosInstructores",
    {
      idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "cursos",
          key: "id",
        },
      },
      idInstructor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "instructores",
          key: "id",
        },
      },
    },
    {
      tableName: "cursosInstructores",
      timestamps: false,
    }
  );

  CursosInstructores.associate = function (models) {
    CursosInstructores.belongsTo(models.cursos, {
      foreignKey: "idCurso",
      as: "cursos",
    });

    CursosInstructores.belongsTo(models.instructores, {
      foreignKey: "idInstructor",
      as: "instructores",
    });
  };

  return CursosInstructores;
};
