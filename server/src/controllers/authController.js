const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({ error: "Query failed..." });
  }
});

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
                res.send({ msg: 200, user: newUser, flash });
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

module.exports = app => app.use("/api", router);
