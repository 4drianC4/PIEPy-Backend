"use strict";

module.exports = (sequelize, DataTypes) => {
  const CertificacionesAlumnos = sequelize.define(
    "CertificacionesAlumnos",
    {
      idCertificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "certificaciones",
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
    },
    {
      tableName: "certificacionesAlumnos",
      timestamps: false,
    }
  );

  CertificacionesAlumnos.associate = function (models) {
    CertificacionesAlumnos.belongsTo(models.alumnos, {
      foreignKey: "idAlumno",
      as: "alumnos",
    });

    CertificacionesAlumnos.belongsTo(models.certificaciones, {
      foreignKey: "idCertificacion",
      as: "certificaciones",
    });
  };

  return CertificacionesAlumnos;
};
