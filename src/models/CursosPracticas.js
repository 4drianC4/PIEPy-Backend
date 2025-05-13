'use strict';

module.exports = (sequelize, DataTypes) => {
    const CursosPractica = sequelize.define('cursosPracticas', {
        idCurso: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'cursos',
                key: 'id'
            }
        },
        idPractica: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'practicas',
                key: 'id'
            }
        }
    }, {
        tableName: 'cursosPracticas',
        timestamps: false
    });

    CursosPractica.associate = function(models) {
        CursosPractica.belongsTo(models.cursos, { 
            foreignKey: 'idCurso',
            as: 'cursos'
        });
        CursosPractica.belongsTo(models.practicas, { 
            foreignKey: 'idPractica',
            as: 'practicas'
        });
    }
    return CursosPractica;
};
