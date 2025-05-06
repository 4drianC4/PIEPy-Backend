'use strict';

module.exports = (sequelize, DataTypes) => {
    const Certificacion = sequelize.define('Certificacion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'Certificacion',
        timestamps: false
    });
    return Certificacion;
};
