'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('alumnosPracticas', {
      idAlumnos: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'alumnos',
          key: 'id'
        }
      },
      idPracticas: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'practicas',
          key: 'id'
        }
      },
      nota: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');     
  }
};
