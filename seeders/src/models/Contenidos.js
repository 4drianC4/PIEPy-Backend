'use strict';

module.exports = (sequelize, DataTypes) => {
    const Contenidos = sequelize.define('contenidos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idCursos: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cursos',
                key: 'id'
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        informacion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, {
        tableName: 'contenidos',
        timestamps: false
    });
    Contenidos.associate = function(models) {
        Contenidos.belongsTo(models.cursos, { 
            foreignKey: 'idCursos',
            as: 'cursos'
        });
    }
    return Contenidos;
};  
