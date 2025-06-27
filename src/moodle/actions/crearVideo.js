const moodleClient = require("../moodleClient");

module.exports = async (datos) => {
  return await moodleClient.post({
    wsfunction: "mod_url_create_urls",
    params: {
      "urls[0][courseid]": parseInt(datos.courseid),
      "urls[0][name]": datos.titulo,
      "urls[0][externalurl]": datos.url,
      "urls[0][intro]": datos.intro || "Video del curso",
      "urls[0][introformat]": 1,
    },
  });
};
