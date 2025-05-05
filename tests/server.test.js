const app = require('../src/server.js');
const { describe, test, expect, afterAll } = require('@jest/globals');

let server;

describe('Express App Configuration', () => {
  afterAll((done) => {
    server.close(done); // Cierra el servidor correctamente
  });

  test('should start on the correct port', (done) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      expect(port).toBeGreaterThan(0);
      done(); // Termina el test después de la verificación
    });
  });
});
