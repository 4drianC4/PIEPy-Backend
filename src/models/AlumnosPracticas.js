'use strict';

module.exports = (sequelize, DataTypes) => {
    const AlumnosPracticas = sequelize.define('alumnosPracticas', {
        idAlumnos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'alumnos',
                key: 'id'
            }
        },
        idPracticas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'practicas',
                key: 'id'
            }
        },
        nota: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
    }, {
        tableName: 'alumnosPracticas',
        timestamps: false
    });
    AlumnosPracticas.associate = function(models) {
        AlumnosPracticas.belongsTo(models.alumnos, { 
            foreignKey: 'idAlumnos',
            as: 'alumnos'
        });
        AlumnosPracticas.belongsTo(models.practicas, { 
            foreignKey: 'idPracticas',
            as: 'practicas'
        });
    }
    return AlumnosPracticas;
};
