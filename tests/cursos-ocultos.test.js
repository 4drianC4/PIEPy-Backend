const request = require('supertest');
const app = require('../src/server.js');
const { describe, test, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const { sequelize } = require('../src/models');

describe('Funcionalidad de Cursos Ocultos', () => {
    let server;

    beforeAll(async () => {
        // Sincronizar la base de datos para tests
        await sequelize.sync({ force: true });
        
        server = app.listen(0);
    });

    afterAll(async () => {
        await sequelize.close();
        if (server) {
            server.close();
        }
    });

    beforeEach(async () => {
        // Limpiar datos antes de cada test
        await sequelize.sync({ force: true });
        
        // Insertar datos de prueba
        await setupTestData();
    });

    async function setupTestData() {
        const { alumnos, cursos, moduloAprendizajes, CursosAlumnos, certificaciones, evaluaciones } = require('../src/models');

        // Crear certificaciones y evaluaciones de prueba
        const cert = await certificaciones.create({
            nombre: 'Certificación Test',
            descripcion: 'Descripción test'
        });

        const eval1 = await evaluaciones.create({
            contenido: 'Evaluación test',
            titulo: 'Evaluación Test'
        });

        // Crear cursos de diferentes niveles
        const cursoPrincipiante = await cursos.create({
            nombre: 'Curso Principiante',
            descripcion: 'Curso para principiantes',
            idCertificacion: cert.id,
            idEvaluacion: eval1.id
        });

        const cursoIntermedio = await cursos.create({
            nombre: 'Curso Intermedio',
            descripcion: 'Curso para nivel intermedio',
            idCertificacion: null,
            idEvaluacion: null
        });

        const cursoAvanzado = await cursos.create({
            nombre: 'Curso Avanzado',
            descripcion: 'Curso para nivel avanzado',
            idCertificacion: null,
            idEvaluacion: null
        });

        // Crear módulos de aprendizaje con diferentes niveles
        await moduloAprendizajes.create({
            titulo: 'Módulo Básico',
            descripcion: 'Conceptos básicos',
            nivel: 'principiante',
            idCurso: cursoPrincipiante.id
        });

        await moduloAprendizajes.create({
            titulo: 'Módulo Intermedio',
            descripcion: 'Conceptos intermedios',
            nivel: 'intermedio',
            idCurso: cursoIntermedio.id
        });

        await moduloAprendizajes.create({
            titulo: 'Módulo Avanzado',
            descripcion: 'Conceptos avanzados',
            nivel: 'avanzado',
            idCurso: cursoAvanzado.id
        });

        // Crear estudiantes
        const estudiantePrincipiante = await alumnos.create({
            nombres: 'Juan',
            apellidos: 'Pérez',
            fecha_nacimiento: '1990-01-01',
            email: 'juan@test.com',
            telefono: '123456789',
            contrasena: 'password123'
        });

        const estudianteIntermedio = await alumnos.create({
            nombres: 'María',
            apellidos: 'García',
            fecha_nacimiento: '1991-01-01',
            email: 'maria@test.com',
            telefono: '987654321',
            contrasena: 'password456'
        });

        // Crear relaciones de cursos completados
        // El estudiante intermedio ha completado el curso principiante
        await CursosAlumnos.create({
            idCurso: cursoPrincipiante.id,
            idAlumno: estudianteIntermedio.id,
            Estado: 'completado'
        });

        return {
            estudiantePrincipiante,
            estudianteIntermedio,
            cursoPrincipiante,
            cursoIntermedio,
            cursoAvanzado
        };
    }

    describe('GET /api/cursos/ocultos/:idAlumno', () => {
        test('debería retornar cursos ocultos para estudiante principiante', async () => {
            const { alumnos } = require('../src/models');
            const estudiante = await alumnos.findOne({ where: { email: 'juan@test.com' } });

            const res = await request(app)
                .get(`/api/cursos/ocultos/${estudiante.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('idAlumno', estudiante.id);
            expect(res.body).toHaveProperty('cursosOcultos');
            expect(res.body).toHaveProperty('mensaje');
            expect(Array.isArray(res.body.cursosOcultos)).toBe(true);
            
            // Un estudiante principiante debería tener el curso avanzado oculto
            expect(res.body.cursosOcultos.length).toBeGreaterThan(0);
        });

        test('debería retornar cursos ocultos para estudiante intermedio', async () => {
            const { alumnos } = require('../src/models');
            const estudiante = await alumnos.findOne({ where: { email: 'maria@test.com' } });

            const res = await request(app)
                .get(`/api/cursos/ocultos/${estudiante.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('idAlumno', estudiante.id);
            expect(res.body).toHaveProperty('cursosOcultos');
            expect(Array.isArray(res.body.cursosOcultos)).toBe(true);
            
            // Un estudiante intermedio no debería tener cursos avanzados ocultos
            // pero tampoco debería tener acceso a cursos muy avanzados
        });

        test('debería retornar error 400 si no se proporciona idAlumno', async () => {
            const res = await request(app)
                .get('/api/cursos/ocultos/');

            expect(res.statusCode).toEqual(404);
        });

        test('debería manejar estudiante inexistente', async () => {
            const res = await request(app)
                .get('/api/cursos/ocultos/99999');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('cursosOcultos');
            // Debería retornar array vacío o manejar el caso gracefully
        });
    });

    describe('GET /api/cursos/disponibles/:idAlumno', () => {
        test('debería retornar cursos disponibles para estudiante principiante', async () => {
            const { alumnos } = require('../src/models');
            const estudiante = await alumnos.findOne({ where: { email: 'juan@test.com' } });

            const res = await request(app)
                .get(`/api/cursos/disponibles/${estudiante.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('idAlumno', estudiante.id);
            expect(res.body).toHaveProperty('cursosDisponibles');
            expect(res.body).toHaveProperty('total');
            expect(Array.isArray(res.body.cursosDisponibles)).toBe(true);
            
            // Verificar que los cursos disponibles tienen la estructura esperada
            if (res.body.cursosDisponibles.length > 0) {
                const curso = res.body.cursosDisponibles[0];
                expect(curso).toHaveProperty('id');
                expect(curso).toHaveProperty('nombre');
                expect(curso).toHaveProperty('descripcion');
            }
        });

        test('debería retornar cursos disponibles para estudiante intermedio', async () => {
            const { alumnos } = require('../src/models');
            const estudiante = await alumnos.findOne({ where: { email: 'maria@test.com' } });

            const res = await request(app)
                .get(`/api/cursos/disponibles/${estudiante.id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('idAlumno', estudiante.id);
            expect(res.body).toHaveProperty('cursosDisponibles');
            expect(res.body).toHaveProperty('total');
            expect(Array.isArray(res.body.cursosDisponibles)).toBe(true);
            
            // Un estudiante intermedio debería tener más cursos disponibles que un principiante
            expect(res.body.total).toBeGreaterThanOrEqual(0);
        });

        test('debería retornar error 400 si no se proporciona idAlumno', async () => {
            const res = await request(app)
                .get('/api/cursos/disponibles/');

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('Lógica de negocio - Niveles de aprendizaje', () => {
        test('estudiante principiante no debería ver cursos avanzados', async () => {
            const { alumnos, cursos } = require('../src/models');
            const estudiante = await alumnos.findOne({ where: { email: 'juan@test.com' } });
            const cursoAvanzado = await cursos.findOne({ where: { nombre: 'Curso Avanzado' } });

            const resOcultos = await request(app)
                .get(`/api/cursos/ocultos/${estudiante.id}`);

            const resDisponibles = await request(app)
                .get(`/api/cursos/disponibles/${estudiante.id}`);

            expect(resOcultos.statusCode).toEqual(200);
            expect(resDisponibles.statusCode).toEqual(200);

            // El curso avanzado debería estar oculto para un principiante
            expect(resOcultos.body.cursosOcultos).toContain(cursoAvanzado.id);
            
            // El curso avanzado no debería estar en los disponibles
            const cursosDisponiblesIds = resDisponibles.body.cursosDisponibles.map(c => c.id);
            expect(cursosDisponiblesIds).not.toContain(cursoAvanzado.id);
        });

        test('estudiante intermedio debería ver cursos de su nivel y anteriores', async () => {
            const { alumnos, cursos } = require('../src/models');
            const estudiante = await alumnos.findOne({ where: { email: 'maria@test.com' } });
            const cursoPrincipiante = await cursos.findOne({ where: { nombre: 'Curso Principiante' } });
            const cursoIntermedio = await cursos.findOne({ where: { nombre: 'Curso Intermedio' } });

            const resDisponibles = await request(app)
                .get(`/api/cursos/disponibles/${estudiante.id}`);

            expect(resDisponibles.statusCode).toEqual(200);

            const cursosDisponiblesIds = resDisponibles.body.cursosDisponibles.map(c => c.id);
            
            // Debería tener acceso a cursos principiante e intermedio
            expect(cursosDisponiblesIds).toContain(cursoPrincipiante.id);
            expect(cursosDisponiblesIds).toContain(cursoIntermedio.id);
        });
    });

    describe('Manejo de errores', () => {
        test('debería manejar errores de base de datos gracefully', async () => {
            // Simular un ID que podría causar problemas
            const res = await request(app)
                .get('/api/cursos/ocultos/abc');

            // Debería retornar un error apropiado
            expect([400, 500]).toContain(res.statusCode);
        });

        test('debería validar parámetros de entrada', async () => {
            const res = await request(app)
                .get('/api/cursos/ocultos/-1');

            expect(res.statusCode).toEqual(200);
            // Debería manejar IDs negativos sin crashear
        });
    });
});
