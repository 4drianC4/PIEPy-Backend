const request = require("supertest");
const app = require("../src/server.js");
const { describe } = require("@jest/globals");

describe("API de autenticación", () => {
  let idAlumno;
  const alumnoData = {
    nombre: "Juan",
    apellido: "Pérez",
    fechaNacimiento: "2000-01-01",
    email: "juan.perez@example.com",
    telefono: "123456789",
    contrasena: "password123",
  };

  it("debería registrar un nuevo alumno", async () => {
    const res = await request(app).post("/api/auth/registrar").send(alumnoData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("alumno");
    expect(res.body.alumno).toHaveProperty("id");
    idAlumno = res.body.alumno.id;
  });

  it("debería fallar al registrar un alumno con un correo ya existente", async () => {
    const res = await request(app).post("/api/auth/registrar").send(alumnoData);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      "mensaje",
      "Este correo ya está registrado."
    );
  });

  it("debería iniciar sesión correctamente con credenciales válidas", async () => {
    const loginData = {
      email: alumnoData.email,
      contrasena: alumnoData.contrasena,
    };
    const res = await request(app).post("/api/auth/login").send(loginData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("mensaje", "Login exitoso");
    expect(res.body).toHaveProperty("alumno");
    expect(res.body.alumno).toHaveProperty("id", idAlumno);
  });

  it("debería fallar al iniciar sesión con una contraseña incorrecta", async () => {
    const loginData = {
      email: alumnoData.email,
      contrasena: "wrongpassword",
    };
    const res = await request(app).post("/api/auth/login").send(loginData);
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("mensaje", "Contraseña incorrecta.");
  });

  it("debería fallar al iniciar sesión con un correo no registrado", async () => {
    const loginData = {
      email: "no.existe@example.com",
      contrasena: "password123",
    };
    const res = await request(app).post("/api/auth/login").send(loginData);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("mensaje", "El correo no está registrado.");
  });
});
