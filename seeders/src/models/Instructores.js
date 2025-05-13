'use strict';

module.exports = (sequelize, DataTypes) => {
    const Instructores = sequelize.define('instructores', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
           type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        administrador: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'instructores',
        timestamps: false
    });

    return Instructores;
};
