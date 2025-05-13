"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cursos", {
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
          model: "certificaciones",
          key: "id",
        },
      },
      idEvaluacion: {
        type: Sequelize.INTEGER,
        unique: true,
        references: {
          model: "evaluaciones",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cursos");
  },
};
