const request = require('supertest');
const app = require('../src/server.js');
const { describe } = require('@jest/globals');

describe('POST /api/analizador', () => {
    it('debería analizar el código correctamente', async () => {
        const codigo = `def saludar():\n    print("Hola, mundo!")\nsaludar()`;

        const res = await request(app)
            .post('/api/analizador')
            .send({ codigo });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('resultado');
    });
    it('debería manejar errores de análisis', async () => {
        const codigoErroneo = `def saludar():\n    print("Hola, mundo!")\nsaludar(`;

        const res = await request(app)
            .post('/api/analizador')
            .send({ codigo: codigoErroneo });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toHaveProperty('message');
    });
});