const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
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

// serve static assets
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("../../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../../client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
