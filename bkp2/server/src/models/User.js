const mongoose = require('../database')

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  senha2: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { collection: 'users' })

const User = mongoose.model('User', UserSchema)

module.exports = User