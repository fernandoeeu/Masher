const express = require("express");

const Receita = require("../models/Receita");

const auth = require("../middleware/auth");

const router = express.Router();

/*
  
*/
router.post("/receitas", async (req, res) => {
  try {
    //const receita = await Receita.create(req.body);

    return res.send({ a: 'a' });
  } catch (err) {
    return res.status(400).send({ error: "Query failed..." });
  }
});

router.get("/receitas", async (req, res) => {
  try {
    const receitas = await Receita.find({
      ing: {
        $all: ["cebola roxa", "banana", "açucar", "ovos"]
      }
    })
      .limit(20)
      .sort({ id: 1 });

    return res.json(receitas);
  } catch (err) {
    return res.status(400).send({ error: "Query Failed..." });
  }
});

router.get("/receitas/all", async (req, res) => {
  try {
    const receitas = await Receita.find({}).sort({ id: 1 });

    return res.json(receitas);
  } catch (err) {
    return res.status(400).send({ error: "Query Failed..." });
  }
});

router.get("/receitas/busca/:id", async (req, res) => {
  try {
    const receita = await Receita.findById(req.params.id);

    return res.json(receita);
  } catch (err) {
    return res.status(400).send({ error: "Receita não encontrada..." });
  }
});

router.post("/receitas/busca/:uid", async (req, res) => {
  try {
    const receitas = await Receita.find({ createdBy: req.params.uid })

    return res.json(receitas)
  } catch (err) {
    return res.status(400).send({ error: "usuario não encontrado" })
  }
});

router.post("/receitas/atualizar/:rid", (req, res) => {
  try {
    // const res = await req.body
    return res.json(req.body)
    // const receitaAtualizada = await Receita.updateOne(
    //   { _id: req.body.rid},
    //   {

    //   }
    // )
  } catch (err) {
    return res.status(400).send({ error: "receita não encontrado" })
  }
})


router.post("/receitas/criar",  async (req, res) => {
  let { titulo, categorias, ingredientes, uid } = req.body;
  try {
    categorias = categorias.map(categoria => categoria.trim());
  ingredientes = ingredientes.map(ingrediente => ingrediente.trim());
  } catch (e) {
    return res.status(400).send({ error: "Por favor, entre com os ingredientes e categorias"})
  }
  let receita = new Receita()
  receita.nome = titulo
  receita.ing = ingredientes
  receita.cat = categorias
  receita.createdBy = uid
  receita.save(function (err) {
    if (err) {
      return console.log("err", err)
    } else {
      console.log(receita)
      res.send({ msg: 'ok' })
    }
  })
  //res.send({ data: req.body.user.id });
  // return console.log(req.body);
  //let receita = res.json({ body: req.body })
});

module.exports = app => app.use("/api", router);
