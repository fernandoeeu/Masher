const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require("../models/User");

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { email, senha } = req.body;
    let errors = [];

    // checando os campos obrigatórios
    if (!email || !senha) {
      errors.push({ msg: "Por favor preencha todos os campos" });
    }
    // Verificando se há erros no array de erros
    if (errors.length > 0) {
      console.log(errors);
      // Enviando os erros para o cliente
      res.send({ erros: errors });
    } else {
      // Validação OK!
      // Verificando se há um usuário com o email fornecido para cadastro
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            // Enviando o erro relacionado ao email em uso
            errors.push({ msg: "Email não cadastrado" });
            res.send({ erros: errors });
          } else {
            bcrypt.compare(senha, user.senha)
              .then(isMatch => {
                if (!isMatch) {
                  errors.push({ msg: "Senha inválida" })
                  res.json({ erros: errors })
                } else {
                  jwt.sign(
                    { id: user.id },
                    'secret',
                    (err, token) => {
                      if (err) console.log(err)
                      res.send({
                        token, user: {
                          id: user.id,
                          nome: user.nome,
                          email: user.email
                        }
                      })

                    }
                  )
                  //res.json({ msg: "autenticado", id: user.id })
                }
              })

          }
        })
        .catch(err => {
          console.log(err)
        })

    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Query failed..." });
  }
});

///////

router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha, senha2 } = req.body;
    let errors = [];

    // checando os campos obrigatórios
    if (!nome || !email || !senha || !senha2) {
      errors.push({ msg: "Por favor preencha todos os campos" });
    }
    // Checando se as senhas coincidem
    if (senha !== senha2) {
      errors.push({ msg: "As senhas não coincidem" });
    }
    // Checando o tamanho minimo das senahs
    if (senha.length < 6) {
      errors.push({ msg: "A senha deve ter ao menos 6 caracteres" });
    }

    // Verificando se há erros no array de erros
    if (errors.length > 0) {
      console.log(errors);
      // Enviando os erros para o cliente
      res.send({ erros: errors });
    } else {
      // Validação OK!
      // Verificando se há um usuário com o email fornecido para cadastro
      const user = await User.findOne({ email: email });
      if (user) {
        // Enviando o erro relacionado ao email em uso
        errors.push({ msg: "Este email já está em uso" });
        res.send({ erros: errors });
      } else {
        // Instanciando um usuário com base no Model do mongoose
        const newUser = new User({
          nome,
          email,
          senha,
          senha2
        });
        // Encriptando a senha
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.senha, salt, (err, hash) => {
            if (err) throw err;
            // setando a senha criptografada
            newUser.senha = hash;
            // salvando o usuario no banco
            newUser
              .save()
              .then(user => {
                flash = {
                  success: req.flash("success_msg", "Você foi cadastrado")
                };
                jwt.sign(
                  { id: user.id },
                  'secret',
                  (err, token) => {
                    if (err) throw err
                    res.send({ msg: 200, user: newUser, token, id: user.id });

                  }
                )
              })
              .catch(err => console.log(err));
          });
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: "Query failed..." });
  }
});

// @route GET api/auth/user
router.get('/auth/user', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-senha')
  if (user) res.json(user)

})

module.exports = app => app.use("/api", router);
