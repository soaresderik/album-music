const express = require("express");
const router = express.Router();
const generateToken = require("../helpers/generateToken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { email } = req.body;

  if (await User.findOne({ email }))
    return res.status(400).send({ error: "Usuário já existe!" });

  try {
    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({
      user,
      token: generateToken({ id: user._id, name: user.name })
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Erro ao tentar criar usuário" });
  }
});

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(404).send({ error: "Usuário não encontrado" });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: "Senha inválida" });

    user.password = undefined;
    res.send({ user, token: generateToken({ id: user._id, name: user.name }) });
  } catch (err) {
    console.log(err);
    return res.send(400).send({ error: "Erro ao tentar autenticar!" });
  }
});

module.exports = app => app.use("/auth", router);
