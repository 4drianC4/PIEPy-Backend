'use strict';

module.exports = (sequelize, DataTypes) => {
  const ModuloAprendizajes = sequelize.define('ModuloAprendizajes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idCurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cursos', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'modulosAprendizajes',
    timestamps: false
  });

  ModuloAprendizajes.associate = function(models) {
        ModuloAprendizajes.belongsTo(models.Curso, { 
          foreignKey: 'idCurso', 
          as: 'curso' });
  };

  return ModuloAprendizajes;
};
