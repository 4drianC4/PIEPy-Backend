'use strict';

module.exports = (sequelize, DataTypes) => {
    const Certificaciones = sequelize.define('certificaciones', {
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
        tableName: 'certificaciones',
        timestamps: false
    });
    return Certificaciones;
};
