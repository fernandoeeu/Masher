const express = require("express");
const cloudinary = require('cloudinary')
const multer = require('multer')
const path = require('path')


const Receita = require("../models/Receita");

const auth = require("../middleware/auth");

const router = express.Router();

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dnpo8spfa/upload`

const CLOUDNARY_UPLOAD_PRESET = 'd1fmbyex'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
});

// app.post('/receitas/imagem', (req, res, next) => {
//   const upload = multer({ storage }).single('name-of-input-key')
//   upload(req, res, function (err) {
//     if (err) {
//       return res.send(err)
//     }
//     res.json(req.file)
//   })
// })

router.post("/receitas", async (req, res) => {
  let ingQ = []
  let queryF = ''
  // { $and: [{ "ingredientes": { $regex: 'sa' } }, { "ingredientes": { $regex: 'cc' } }] }
  const query = req.body

  // console.log('body', req.body)
  query.map(i => {
    ingQ.push(`{"ingredientesLower": {"$regex": "${i.toLowerCase()}"} }`)
  })
  queryF = `{"$and": [ ${ingQ} ]}`
  queryF = JSON.parse(queryF)
  if (query.length > 0) {
    try {
      const receitas = await Receita.find(queryF)
      // .limit(20)
      // .sort({ id: 1 });
      console.log(receitas.length)
      return res.json(receitas);
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: "Query Failed..." });
    }
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
    return res.status(200).send(receita);
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

router.post("/receitas/imagem", async (req, res) => {
  try {
    console.log(req.body)
    const { id, url } = req.body
    const doc = await Receita.findOne({ _id: id })
    if (doc) {
      
        doc.image = url
        const saved = await doc.save()
        if (saved) {
          console.log("saved", saved)
          console.log("atualizou")
          return res.status(200).send({ msg: 'atualizado!!!' })
        
      }

    }
  } catch (e) {
    console.log(e)
    return res.status(400).send({ error: "Impossivel atualizar imagem da receita" })
  }
})

router.post("/receitas/atualizar", async (req, res) => {
  try {
    console.log(req.body)
    const { ingredientes, titulo, categoriasPrincipais, categoriasSecundarias, tempo, custo, dificuldade, passos, _id } = req.body
    const doc = await Receita.findOne({ _id: _id })
    if (doc) {
      console.log(doc.nome)
      doc.ingredientes = ingredientes
      doc.nome = titulo
      doc.categoriasPrincipais = categoriasPrincipais
      doc.categoriasSecundarias = categoriasSecundarias
      doc.custo = custo
      doc.tempo = tempo
      doc.dificuldade = dificuldade
      doc.passos = passos

      const saved = await doc.save()
      if (saved === doc) {
        res.status(200).send({ id: _id, url: doc.image })
      }
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: "receita não encontrado" })
  }
})


router.post("/receitas/criar", async (req, res) => {
  let { titulo, categoriasPrincipais, categoriasSecundarias, custo, dificuldade, passos, tempo, ingredientes, uid } = req.body;
  let receita = new Receita()
  receita.nome = titulo
  receita.ingredientes = ingredientes
  let ingL = []
  ingredientes.map(i => ingL.push(i.toLowerCase()))
  receita.ingredientesLower = ingL
  receita.categoriasPrincipais = categoriasPrincipais
  receita.categoriasSecundarias = categoriasSecundarias
  receita.createdBy = uid
  custo.length > 0 ? receita.custo = custo : null
  tempo.length > 0 ? receita.tempo = tempo : null
  dificuldade.length > 0 ? receita.dificuldade = dificuldade : null
  receita.passos = passos
  receita.save(function (err) {
    if (err) {
      console.log(err)
      return res.status(400).send({ error: "receita não encontrado" })
    } else {
      console.log(receita)
      res.send({ id: receita._id })
    }
  })
  //res.send({ data: req.body.user.id });
  // return console.log(req.body);
  //let receita = res.json({ body: req.body })
});

module.exports = app => app.use("/api", router);
