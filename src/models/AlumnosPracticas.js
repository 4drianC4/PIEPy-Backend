'use strict';

module.exports = (sequelize, DataTypes) => {
    const AlumnosPracticas = sequelize.define('alumnos_practicas', {
        id_Alumnos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'alumnos',
                key: 'id'
            }
        },
        id_Practicas: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        tableName: 'alumnos_practicas',
        timestamps: false
    });
    AlumnosPracticas.associate = function(models) {
        AlumnosPracticas.belongsTo(models.alumnos, { foreignKey: 'id_Alumnos' });
        AlumnosPracticas.belongsTo(models.practicas, { foreignKey: 'id_Practicas' });
    }
    return AlumnosPracticas;
};
