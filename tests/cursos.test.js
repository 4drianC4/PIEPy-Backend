const request = require('supertest');
const app = require('../src/server.js');
const { describe } = require('@jest/globals');

describe('API de cursos', () => {
    let idCertificado;
    let idEvaluacion;
    let idCurso;

    beforeAll(async () => {
        const certRes = await request(app)
            .post('/api/certificaciones')
            .send({
                nombre: "Certificacion Introducción a Python",
                descripcion: "Este es un certificado de Introducción a Python"
            });
        idCertificado = certRes.body.id;

        const evalRes = await request(app)
            .post('/api/evaluaciones')
            .send({
                contenido: "Este es el examen",
                titulo: "Examen de introducción a Python"
            });
        idEvaluacion = evalRes.body.id;
    });

    it('debería crear un nuevo curso', async () => {
        const nuevoCurso = {
            nombre: 'Curso de Prueba',
            descripcion: 'Descripción del curso de prueba',
            idCertificacion: idCertificado,
            idEvaluacion: idEvaluacion
        };
        const res = await request(app)
            .post('/api/cursos')
            .send(nuevoCurso);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        idCurso = res.body.id;
    });

    it('debería obtener todos los cursos', async () => {        
        const res = await request(app).get('/api/cursos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });    

    it('debería obtener un curso por ID', async () => {
        const res = await request(app).get(`/api/cursos/${idCurso}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
    });

    it('debería actualizar un curso existente', async () => {
        const cursoActualizado = { 
            nombre: 'Curso de Prueba Actualizado',
            descripcion: 'Descripción del curso de prueba',
            idCertificacion: idCertificado,
            idEvaluacion: idEvaluacion 
        };
        const res = await request(app)
            .put(`/api/cursos/${idCurso}`)
            .send(cursoActualizado);
        expect(res.statusCode).toEqual(200);
    });

    it('debería eliminar un curso', async () => {
        const res = await request(app).delete(`/api/cursos/${idCurso}`);
        expect(res.statusCode).toEqual(200);
    });
});