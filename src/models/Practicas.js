'use strict';

module.exports = (sequelize, DataTypes) => {
    const Practicas = sequelize.define('practicas', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'practicas',
        timestamps: false
    });

    return Practicas;
};
