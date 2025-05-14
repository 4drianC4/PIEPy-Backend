'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('moduloAprendizaje', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT
      },
      nivel: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      idCurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cursos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize){
    await queryInterface.dropTable('moduloAprendizaje');
  }
};
