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
    linea: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    editable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    test: {
      type: DataTypes.TEXT,
      allowNull: true
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
