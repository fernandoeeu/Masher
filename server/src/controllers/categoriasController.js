const express = require("express");

const router = express.Router();

router.get("/categorias", async (req, res) => {
  try {
    const categorias = [
      {
        id: 0,
        nome: "Brasileira",
      },
      {
        id: 1,
        nome: "Japonesa",
      },
      {
        id: 2,
        nome: "Sobremesas",
      }
    ]

    return res.send(categorias);
  } catch (err) {
    return res.status(400).send({ error: "Query failed..." });
  }
});

module.exports = app => app.use("/api", router);