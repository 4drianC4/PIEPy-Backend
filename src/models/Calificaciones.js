'use strict';

module.exports = (sequelize, DataTypes) => {
    const Calificaciones = sequelize.define('calificaciones', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idAlumnos: {
            type: DataTypes.INTEGER,
            references: {
                model: 'alumnos',
                key: 'id'
            }
        },
        idCursos: {
            type: DataTypes.INTEGER,
            references: {
                model: 'cursos',
                key: 'id'
            }
        },
        idEvaluaciones: {
            type: DataTypes.INTEGER,
            references: {
                model: 'evaluaciones',
                key: 'id'
            }
        },
        idPracticas: {
            type: DataTypes.INTEGER,
            references: {
                model: 'practicas',
                key: 'id'
            }
        },
    }, {
        tableName: 'calificaciones',
        timestamps: false
    });
    Calificaciones.associate = function(models) {
        Calificaciones.belongsTo(models.alumnos, { 
            foreignKey: 'idAlumnos',
            as: 'alumnos'
        });
        Calificaciones.belongsTo(models.cursos, { 
            foreignKey: 'idCursos',
            as: 'cursos'
        });
        Calificaciones.belongsTo(models.evaluaciones, { 
            foreignKey: 'idEvaluaciones',
            as: 'evaluaciones'
        });
    }
    return Calificaciones;
};