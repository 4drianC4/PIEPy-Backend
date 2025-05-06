"use strict";

module.exports = (sequelize, DataTypes) => {
  const CertificacionAlumno = sequelize.define(
    "CertificacionAlumno",
    {
      idCertificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Certificacion",
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
    },
    {
      tableName: "CertificacionAlumno",
      timestamps: false,
    }
  );

  CertificacionAlumno.associate = function (models) {
    CertificacionAlumno.belongsTo(models.Alumno, {
      foreignKey: "idAlumno",
      as: "alumno",
    });

    CertificacionAlumno.belongsTo(models.Certificacion, {
      foreignKey: "idCertificacion",
      as: "certificacion",
    });
  };

  return CertificacionAlumno;
};
