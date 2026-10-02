const app = require("../template 3/backend/server");

module.exports = function handler(request, response) {
  return app(request, response);
};
