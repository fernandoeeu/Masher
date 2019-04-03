const mongoose = require('../database')

const ReceitaSchema = new mongoose.Schema({
  // id: {
  //   type: String,
  //   required: true
  // },
  nome: {
    type: String,
    required: true
  },
  ing: {
    type: [String],
    required: true
  },
  cat: {
    type: [String],
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

}, { collection: 'receitas_final' })

const Receita = mongoose.model('Receita', ReceitaSchema)

module.exports = Receita