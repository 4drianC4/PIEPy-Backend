'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('alumnosEvaluaciones', {
        idAlumnos: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'alumnos',
            key: 'id'
          }
        },
        idEvaluaciones: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: {
            model: 'evaluaciones',
            key: 'id'
          }
        },
        nota: {
          type: Sequelize.FLOAT,
          allowNull: true
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('alumnosEvaluaciones');
  }
};
