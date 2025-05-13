'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('calificaciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idAlumnos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'alumnos',
          key: 'id'
        }
      },
      idCursos: {
        type: Sequelize.INTEGER,
        references: {
          model: 'cursos',
          key: 'id'
        }
      },
      idEvaluaciones: {
        type: Sequelize.INTEGER,
        references: {
          model: 'evaluaciones',
          key: 'id'
        }
      },
      idPracticas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'practicas',
          key: 'id'
        }
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('calificaciones');
  }
};
