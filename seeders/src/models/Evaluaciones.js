'use strict';

module.exports = (sequelize, DataTypes) => {
    const Evaluaciones = sequelize.define('evaluaciones', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contenido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'evaluaciones',
        timestamps: false
    });
    return Evaluaciones;
};
