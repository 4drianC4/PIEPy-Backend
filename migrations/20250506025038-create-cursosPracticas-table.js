'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cursosPracticas', {
      idCurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'cursos', 
          key: 'id'
        },
      },
      idPractica: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'practicas', 
          key: 'id'
        },
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cursosPracticas');
  }
};