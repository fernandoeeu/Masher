const mongoose = require('mongoose')

url = `mongodb+srv://fernandoeeu:fernando123@cluster0-ysbfg.mongodb.net/teste-integrador?retryWrites=true`
mongoose.connect(url, { useNewUrlParser: true })
mongoose.Promise = global.Promise

module.exports = mongoose