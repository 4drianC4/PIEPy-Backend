const crypto = require("crypto");
const db = require("../models");
const alumnos = db.alumnos;

function md5Hash(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

const registrarAlumno = async (req, res) => {
  const { nombre, apellido, fechaNacimiento, email, telefono, contrasena } =
    req.body;

  try {
    const alumnoExistente = await alumnos.findOne({ where: { email } });

    if (alumnoExistente) {
      return res
        .status(400)
        .json({ mensaje: "Este correo ya está registrado." });
    }

    const nuevoAlumno = await alumnos.create({
      nombre,
      apellido,
      fechaNacimiento,
      email,
      telefono,
      contrasena: md5Hash(contrasena),
    });

    res.status(201).json({
      mensaje: "Alumno registrado exitosamente.",
      alumno: {
        id: nuevoAlumno.id,
        nombre: nuevoAlumno.nombre,
        apellido: nuevoAlumno.apellido,
        email: nuevoAlumno.email,
        telefono: nuevoAlumno.telefono,
        fecha_registro: nuevoAlumno.fecha_registro,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error en el registro", error: error.message });
  }
};

const loginAlumno = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const alumno = await alumnos.findOne({ where: { email } });

    if (!alumno) {
      return res.status(404).json({ mensaje: "El correo no está registrado." });
    }

    if (alumno.contrasena !== md5Hash(contrasena)) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta." });
    }

    res.status(200).json({
      mensaje: "Login exitoso",
      alumno: {
        id: alumno.id,
        nombre: alumno.nombre,
        apellido: alumno.apellido,
        email: alumno.email,
        telefono: alumno.telefono,
        fecha_registro: alumno.fecha_registro,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al iniciar sesión", error: error.message });
  }
};

module.exports = {
  registrarAlumno,
  loginAlumno,
};
