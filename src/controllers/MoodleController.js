const acciones = {
  crear_texto: require("../moodle/actions/crearTexto"),
  crear_video: require("../moodle/actions/crearVideo"),
  crear_quiz: require("../moodle/actions/crearQuiz"),
};

exports.procesarAccion = async (req, res) => {
  const { accion, datos } = req.body;
  const ejecutar = acciones[accion];

  if (!ejecutar) return res.status(400).json({ error: "Acción no reconocida" });

  try {
    const resultado = await ejecutar(datos);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
