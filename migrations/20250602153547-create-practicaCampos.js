'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('practicacampos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idPractica: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'practicas',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      linea: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      orden: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      editable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('practicacampos');
  }
};
