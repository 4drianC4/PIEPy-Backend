'use strict';

module.exports = (sequelize, DataTypes) => {
  const PracticaCampos = sequelize.define('practicaCampos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idPractica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombreCampo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'practicacampos',
    timestamps: false
  });

  PracticaCampos.associate = function(models) {
    PracticaCampos.belongsTo(models.practicas, {
      foreignKey: 'idPractica',
      as: 'practica',
      onDelete: 'CASCADE'
    });
  };

  return PracticaCampos;
};
