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

    Evaluaciones.associate = function(models) {
        Evaluaciones.hasMany(models.alumnosEvaluaciones, { foreignKey: 'idEvaluacion' });
        Evaluaciones.hasMany(models.cursos, { foreignKey: 'idEvaluacion' });
    };

    return Evaluaciones;
};
