const request = require('supertest');
const app = require('../src/server.js');
const { describe } = require('@jest/globals');

describe('API de cursos', () => {
    let idCertificado;
    let idEvaluacion;
    let idCurso;

    beforeAll(async () => {
        const certRes = await request(app)
            .post('/api/certificados')
            .send({ nombre: 'Certificado Test' });
        idCertificado = certRes.body.id;

        const evalRes = await request(app)
            .post('/api/evaluaciones')
            .send({ nombre: 'Evaluación Test' });
        idEvaluacion = evalRes.body.id;
    });

    it('debería obtener todos los cursos', async () => {        
        const res = await request(app).get('/api/cursos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('debería crear un nuevo curso', async () => {
        const nuevoCurso = {
            nombre: 'Curso de Prueba',
            descripcion: 'Descripción del curso de prueba',
            id_certificado: idCertificado,
            id_evaluacion: idEvaluacion
        };
        const res = await request(app)
            .post('/api/cursos')
            .send(nuevoCurso);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        idCurso = res.body.id;
    });

    it('debería obtener un curso por ID', async () => {
        const res = await request(app).get(`/api/cursos/${idCurso}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('debería actualizar un curso existente', async () => {
        const cursoActualizado = { nombre: 'Curso Actualizado' };
        const res = await request(app)
            .put(`/api/cursos/${idCurso}`)
            .send(cursoActualizado);
        expect(res.statusCode).toEqual(200);
        expect(res.body.nombre).toEqual('Curso Actualizado');
    });

    it('debería eliminar un curso', async () => {
        const res = await request(app).delete(`/api/cursos/${idCurso}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Curso eliminado correctamente');
    });
});