const axios = require("axios");
const { MOODLE_URL, MOODLE_TOKEN } = process.env;

module.exports = {
  post: async ({ wsfunction, params }) => {
    const response = await axios.post(MOODLE_URL, null, {
      params: {
        wstoken: MOODLE_TOKEN,
        wsfunction,
        moodlewsrestformat: "json",
        ...params,
      },
    });
    return response.data;
  },
};
