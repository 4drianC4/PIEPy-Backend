"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("curso", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      idCertificacion: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: "Certificacion",
          key: "id",
        },
      },
      idEvaluacion: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: "Evaluacion",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("curso");
  },
};
