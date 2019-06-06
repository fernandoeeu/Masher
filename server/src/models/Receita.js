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
  ingredientesLower: {
    type: [String],
    required: true
  },
  categoriasPrincipais: {
    type: [{
      id: Number,
      nome: String
    }],
    required: true
  },
  categoriasSecundarias: {
    type: [{
      id: Number,
      nome: String,
      pai: Number
    }],
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
  },
  image: {
    type: String
  }

}, { collection: 'receitas_final' })

const Receita = mongoose.model('Receita', ReceitaSchema)

module.exports = Receita