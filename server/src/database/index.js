const mongoose = require('mongoose')

try {
    url = `mongodb+srv://fernandoeeu:fernando123@cluster0-ysbfg.mongodb.net/teste-integrador?retryWrites=true`
    mongoose.connect(url, { useNewUrlParser: true })
    mongoose.Promise = global.Promise
} catch (e) {
    console.log('erro ao conectar: ', e)
}

module.exports = mongoose