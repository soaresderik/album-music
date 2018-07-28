const jwt = require("jsonwebtoken");
const authconfig = require("../../config/auth");

module.exports = (req, res, next) => {
  const tokenheader = req.headers.authorization;

  if (!tokenheader)
    return res.status(401).send({ error: "O token é obrigatório" });

  const parts = tokenheader.split(" ");

  if (!(parts.length === 2))
    return res.status(401).send({ error: "Erro no Token" });

  const [strategy, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ error: "Token incompleto" });

  jwt.verify(token, authconfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token inválido" });

    req.user.id = decoded.id;
    req.user.name = decoded.name;

    next();
  });
};
