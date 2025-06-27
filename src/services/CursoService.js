const {cursos, certificaciones, evaluaciones, moduloAprendizajes, CursosAlumnos} = require('../models');

module.exports = {
    async getAllCursos() {
        try {
            const cursosList = await cursos.findAll({
                include: [
                    {
                        model: certificaciones,
                        as: 'certificaciones'
                    },
                    {
                        model: evaluaciones,
                        as: 'evaluaciones'
                    }
                ]
            });
            return cursosList;
        } catch (error) {
            throw new Error('Error fetching cursos: ' + error.message);
        }
    },

    async getCursoById(id) {
        try {
            const curso = await cursos.findByPk(id, {
                include: [
                    {
                        model: certificaciones,
                        as: 'certificaciones'
                    },
                    {
                        model: evaluaciones,
                        as: 'evaluaciones'
                    }
                ]
            });
            if (!curso) {
                throw new Error('Curso not found');
            }
            return curso;
        } catch (error) {
            throw new Error('Error fetching curso by ID: ' + error.message);
        }
    },

    async createCurso(cursoData) {
        try {
            const newCurso = await cursos.create(cursoData);
            return newCurso;
        } catch (error) {
            throw new Error('Error creating curso: ' + error.message);
        }
    },

    async updateCurso(id, cursoData) {
        try {
            const [updated] = await cursos.update(cursoData, { where: { id } });
            if (!updated) {
                throw new Error('Curso not found');
            }
            return updated;
        } catch (error) {
            throw new Error('Error updating curso: ' + error.message);
        }
    },

    async deleteCurso(id) {
        try {
            const deleted = await cursos.destroy({ where: { id } });
            if (!deleted) {
                throw new Error('Curso not found');
            }
            return deleted;
        } catch (error) {
            throw new Error('Error deleting curso: ' + error.message);
        }
    },

    /**
     * Obtiene los cursos que deben estar ocultos para un estudiante específico
     * basándose en su nivel de aprendizaje actual
     */
    async getCursosOcultosParaEstudiante(idAlumno) {
        try {
            // Obtener el nivel actual del estudiante basado en cursos completados
            const nivelActual = await this.obtenerNivelActualEstudiante(idAlumno);
            
            // Obtener todos los cursos con sus módulos
            const todosCursos = await cursos.findAll({
                include: [
                    {
                        model: moduloAprendizajes,
                        required: true // Solo cursos que tengan módulos
                    },
                    {
                        model: certificaciones,
                        as: 'certificaciones'
                    },
                    {
                        model: evaluaciones,
                        as: 'evaluaciones'
                    }
                ]
            });

            // Filtrar cursos que están fuera del rango de aprendizaje
            const cursosOcultos = todosCursos.filter(curso => {
                const nivelCurso = this.determinarNivelCurso(curso.moduloAprendizajes);
                return this.debeOcultarseCurso(nivelCurso, nivelActual);
            });

            return cursosOcultos.map(curso => curso.id);
        } catch (error) {
            throw new Error('Error obteniendo cursos ocultos: ' + error.message);
        }
    },

    /**
     * Obtiene cursos disponibles para un estudiante (no ocultos)
     */
    async getCursosDisponiblesParaEstudiante(idAlumno) {
        try {
            const { Op } = require('sequelize');
            const cursosOcultosIds = await this.getCursosOcultosParaEstudiante(idAlumno);
            
            const cursosDisponibles = await cursos.findAll({
                where: cursosOcultosIds.length > 0 ? {
                    id: {
                        [Op.notIn]: cursosOcultosIds
                    }
                } : {},
                include: [
                    {
                        model: certificaciones,
                        as: 'certificaciones'
                    },
                    {
                        model: evaluaciones,
                        as: 'evaluaciones'
                    },
                    {
                        model: moduloAprendizajes
                    }
                ]
            });

            return cursosDisponibles;
        } catch (error) {
            throw new Error('Error obteniendo cursos disponibles: ' + error.message);
        }
    },

    /**
     * Determina el nivel actual del estudiante basado en cursos completados
     */
    async obtenerNivelActualEstudiante(idAlumno) {
        try {
            const cursosCompletados = await CursosAlumnos.findAll({
                where: {
                    idAlumno: idAlumno,
                    Estado: 'completado'
                },
                include: [
                    {
                        model: cursos,
                        as: 'cursos',
                        include: [
                            {
                                model: moduloAprendizajes
                            }
                        ]
                    }
                ]
            });

            if (cursosCompletados.length === 0) {
                return 'principiante'; // Nivel por defecto para estudiantes nuevos
            }

            // Determinar el nivel más alto alcanzado
            let nivelMasAlto = 'principiante';
            const jerarquiaNiveles = ['principiante', 'intermedio', 'avanzado'];

            cursosCompletados.forEach(cursoAlumno => {
                if (cursoAlumno.cursos && cursoAlumno.cursos.moduloAprendizajes) {
                    cursoAlumno.cursos.moduloAprendizajes.forEach(modulo => {
                        const nivelModulo = modulo.nivel.toLowerCase();
                        const indiceActual = jerarquiaNiveles.indexOf(nivelMasAlto);
                        const indiceModulo = jerarquiaNiveles.indexOf(nivelModulo);
                        
                        if (indiceModulo > indiceActual) {
                            nivelMasAlto = nivelModulo;
                        }
                    });
                }
            });

            return nivelMasAlto;
        } catch (error) {
            throw new Error('Error determinando nivel del estudiante: ' + error.message);
        }
    },

    /**
     * Determina el nivel de un curso basado en sus módulos
     */
    determinarNivelCurso(modulos) {
        if (!modulos || modulos.length === 0) {
            return 'principiante';
        }

        const jerarquiaNiveles = ['principiante', 'intermedio', 'avanzado'];
        let nivelMasAlto = 'principiante';

        modulos.forEach(modulo => {
            const nivelModulo = modulo.nivel.toLowerCase();
            const indiceActual = jerarquiaNiveles.indexOf(nivelMasAlto);
            const indiceModulo = jerarquiaNiveles.indexOf(nivelModulo);
            
            if (indiceModulo > indiceActual) {
                nivelMasAlto = nivelModulo;
            }
        });

        return nivelMasAlto;
    },

    /**
     * Determina si un curso debe ocultarse basado en los niveles
     */
    debeOcultarseCurso(nivelCurso, nivelEstudiante) {
        const jerarquiaNiveles = ['principiante', 'intermedio', 'avanzado'];
        const indiceEstudiante = jerarquiaNiveles.indexOf(nivelEstudiante);
        const indiceCurso = jerarquiaNiveles.indexOf(nivelCurso);

        // Ocultar cursos que están más de 1 nivel por encima del estudiante
        return indiceCurso > (indiceEstudiante + 1);
    }
};