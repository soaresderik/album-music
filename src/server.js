const express = require("express");
const app = express();

app.use(express.json());

require("./app/controllers/index")(app);

const port = 3000;
app.listen(port, () => console.log(`Rodando na porta ${port}`));
