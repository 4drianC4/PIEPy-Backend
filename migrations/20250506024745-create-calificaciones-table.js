'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Calificaciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idAlumnos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Alumnos',
          key: 'id'
        }
      },
      idCursos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cursos',
          key: 'id'
        }
      },
      idEvaluaciones: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Evaluaciones',
          key: 'id'
        }
      },
      idPracticas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Practicas',
          key: 'id'
        }
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
