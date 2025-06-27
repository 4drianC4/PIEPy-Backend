const moodleClient = require("../moodleClient");

module.exports = async (datos) => {
  return await moodleClient.post({
    wsfunction: "core_course_edit_module",
    params: {
      cmid: 0,
      modulename: "page",
      section: datos.section || 1,
      courseid: datos.courseid,
      name: datos.titulo,
      visible: 1,
      completion: 1,
      "customdata[content]": datos.contenido,
      "customdata[intro]": datos.intro || "Recurso teórico",
      "customdata[introformat]": 1,
    },
  });
};
