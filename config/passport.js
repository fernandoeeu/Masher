const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Carregar model do usuário
const User = require('../server/src/models/User')



module.exports = function (passport) {
  passport.use(
    new LocalStrategy({
      usernameField: 'email'
    }, (email, password, done) => {
      // Verificar usuario
      User.findOne({ email: email })
        .then(user => {
          if (!user) {
            return done(null, false, { msg: 'Email não registrado' })
          }
          // verificar senhas
          // bcrypt.compare(password, user.password, (err, isMatch) => {
          //   if (err) throw err
          //   if (isMatch) {
          //     return done(null, user)
          //   } else {
          //     return done(null, false, { msg: 'Senha incorreta' })
          //   }
          // })
          return done(null, user)
        })
        .catch(err => console.log(err))
    })
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}