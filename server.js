const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const passport = require('passport')
// const cors = require('cors')

const app = express();

// passport config
require('./config/passport')(passport)

// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Express Session Middlewave
app.use(
  session({
    secret: "Keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect Flash Middleware
app.use(flash());

// Instanciando variaveis globais || personalizando as mensagens ao longo da aplicação
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

require("./server/src/controllers/receitaController")(app);
require("./server/src/controllers/authController")(app);



const PORT = process.env.PORT || 5000;

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
})


app.listen(PORT, (req, res) => {
  console.log(`Server listening on port: ${PORT}`)
});
