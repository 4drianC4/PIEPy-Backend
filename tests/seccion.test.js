const request = require("supertest");
const app = require("../src/server.js");
const { describe, it, beforeAll, afterAll, expect } = require("@jest/globals");

describe("API de Secciones", () => {
  let idCurso;

  beforeAll(async () => {
    const cursoRes = await request(app).post("/api/cursos").send({
      nombre: "Curso de Prueba",
      descripcion: "Descripción del curso de prueba",
    });
    idCurso = cursoRes.body.id;
  });

  afterAll(async () => {
    await request(app).delete(`/api/cursos/${idCurso}`);
  });

  it("debería crear una nueva sección con contenidos", async () => {
    const seccionData = {
      idCursos: idCurso,
      contenidos: [
        {
          descripcion: "Introducción al curso",
          informacion: "Este es el contenido introductorio del curso.",
        },
        {
          descripcion: "Lección 1",
          informacion: "Detalles de la lección 1.",
        },
      ],
    };

    const res = await request(app).post("/api/seccion").send(seccionData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty(
      "mensaje",
      "Contenidos creados exitosamente."
    );
  });

  it("debería fallar al crear una sección sin idCursos", async () => {
    const seccionData = {
      contenidos: [
        {
          descripcion: "Contenido sin curso",
          informacion: "Este contenido no tiene un curso asociado.",
        },
      ],
    };

    const res = await request(app).post("/api/seccion").send(seccionData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("mensaje", "Error al crear los contenidos");
    expect(res.body.error).toContain("El campo idCursos es obligatorio");
  });

  it("debería fallar al crear una sección con un idCursos inexistente", async () => {
    const seccionData = {
      idCursos: 9999,
      contenidos: [
        {
          descripcion: "Contenido con curso inexistente",
          informacion: "Este contenido está asociado a un curso inexistente.",
        },
      ],
    };

    const res = await request(app).post("/api/seccion").send(seccionData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("mensaje", "Error al crear los contenidos");
    expect(res.body.error).toContain("El curso especificado no existe");
  });
});
