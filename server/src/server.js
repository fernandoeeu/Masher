const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
// const cors = require('cors')

const app = express();
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
// Connect Flash Middleware
app.use(flash());

// Instanciando variaveis globais || personalizando as mensagens ao longo da aplicação
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

require("./controllers/receitaController")(app);
require("./controllers/authController")(app);

app.listen(3002);
