const express = require("express");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

require("./routes/authRoutes")(app);
//require("./routes/htmlRoutes")(app);

require("./routes/apiRoutes")(app);
require("./routes/protectedViews")(app);

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/portal", (req, res) => {
  db.Employee.findAll().then((result) => {
    const hbsObject = {
      employees: result,
    };
    res.render("portal", hbsObject);
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});

// app.listen(PORT, () => {
//   console.log(`App listening on PORT: ${PORT}`);
// });
