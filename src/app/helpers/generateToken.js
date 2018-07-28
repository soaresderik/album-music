const jwt = require("jsonwebtoken");
const authconfig = require("../../config/auth");

/* gerar Token de autenticação */
module.exports = (params = {}) => {
  return jwt.sign(params, authconfig.secret, {
    expiresIn: "24h"
  });
};
