const express = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const router = express.Router()

router.post('/signin', async (req, res) => {
  try {

  } catch (err) {
    return res.status(400).send({ error: 'Query failed...' })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha, senha2 } = req.body
    let errors = []

    // Check Required Fields
    if (!nome || !email || !senha) {
      errors.push({ msg: "Por favor preencha todos os campos" })
    }
    // Check Passwords match
    if (senha !== senha2) {
      errors.push({ msg: "As senhas não coincidem" })
    }
    // Check password length
    if (senha.length < 6) {
      errors.push({ msg: "A senha deve ter ao menos 6 caracteres" })
    }

    if (errors.length > 0) {

      console.log(errors)
      res.send({ erros: errors })
    } else {
      // validation passed
      const user = await User.findOne({ email: email })
      if (user) {
        errors.push({ msg: "Este email já está em uso" })
        res.send({ erros: errors })
      } else {
        const newUser = new User({
          nome,
          email,
          senha,
          senha2
        })
        // Encriptando a senha
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.senha, salt, (err, hash) => {
            if (err) throw err
            // setando a senha criptografada
            newUser.senha = hash
            // salvando o usuario no banco
            newUser.save()
              .then()
              .catch(err => console.log(err))
          })
        })
      }

    }

  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Query failed...' })
  }
})

module.exports = app => app.use('/api', router)