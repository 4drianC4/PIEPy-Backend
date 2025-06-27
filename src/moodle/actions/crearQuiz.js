const moodleClient = require("../moodleClient");

module.exports = async (datos) => {
  return await moodleClient.post({
    wsfunction: "core_course_edit_module",
    params: {
      cmid: 0,
      modulename: "quiz",
      section: datos.section || 1,
      courseid: datos.courseid,
      name: datos.titulo,
      visible: 1,
      completion: 1,
      "customdata[intro]": datos.intro || "Evaluación del tema",
      "customdata[introformat]": 1,
      "customdata[timelimit]": datos.tiempo || 600,
    },
  });
};
