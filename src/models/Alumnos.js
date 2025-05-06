'use strict';

module.exports = (sequelize, DataTypes) => {
    const Alumnos = sequelize.define('alumnos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    }, {
        tableName: 'alumnos',
        timestamps: false
    });
    return Alumnos;
}