'use strict';

module.exports = (sequelize, DataTypes) => {
    const AlumnosEvaluaciones = sequelize.define('alumnosEvaluaciones', {
        idAlumnos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'alumnos',
                key: 'id'
            }
        },
        idEvaluaciones: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'evaluaciones',
                key: 'id'
            }
        },
        nota: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    }, {
        tableName: 'alumnosEvaluaciones',
        timestamps: false
    });
    AlumnosEvaluaciones.associate = function(models) {
        AlumnosEvaluaciones.belongsTo(models.alumnos, { foreignKey: 'id_Alumnos' });
        AlumnosEvaluaciones.belongsTo(models.evaluaciones, { foreignKey: 'id_Evaluaciones' });
    }
    return AlumnosEvaluaciones;
}