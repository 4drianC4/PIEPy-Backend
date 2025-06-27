'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('practicacampos', [
      {
        idPractica: 1,
        linea: 'def verificar_par(num):',
        orden: 1,
        editable: false
      },
      {
        idPractica: 1,
        linea: '    if num % 2 == 0:',
        orden: 2,
        editable: true
      },
      {
        idPractica: 1,
        linea: '        return "Es par"',
        orden: 3,
        editable: true
      },
      {
        idPractica: 1,
        linea: '    else:',
        orden: 4,
        editable: false
      },
      {
        idPractica: 1,
        linea: '        return "Es impar"',
        orden: 5,
        editable: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('practicacampos', null, {});
  }
};
