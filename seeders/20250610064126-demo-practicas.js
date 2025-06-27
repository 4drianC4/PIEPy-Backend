'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('practicas', [
      {
        titulo: 'Verificar si un número es par o impar',
        contenido: 'Practica para determinar si un número es par o impar en Python'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('practicas', null, {});
  }
};
