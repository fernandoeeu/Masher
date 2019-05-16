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
  ingredientes: {
    type: [String],
    required: true
  },
  ingredientesQtd: {
    type: [String],
    required: true
  },
  categoriasPrincipais: {
    type: [String],
    required: true
  },
  categoriasSecundarias: {
    type: [String],
    required: true
  },
  tempo: {
    type: String,
    required: false
  },
  custo: {
    type: String,
    required: false
  },
  dificuldade: {
    type: String,
    required: false
  },
  passos: {
    type: String,
    required: false
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