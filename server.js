const express = require("express");
const bodyParser = require("body-parser");
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
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

app.engine("handlebars", exphbs({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "handlebars");

require("./routes/authRoutes")(app);
//require("./routes/htmlRoutes")(app);

require("./routes/apiRoutes")(app);
require("./routes/protectedViews")(app);

app.get("/", (req, res) => {
  res.render("index1");
});

app.get("/Portal", (req, res) => {
  console.log(req.body);
  // Write code here to retrieve all of the todos from the database and res.json them back to the user
  db.Employee.findAll().then((result) => {
    console.log(result)
    const hbsObject = {
      employees: result,
    };
    const employees = result;
    console.log(employees)
    res.render('index2', hbsObject);
    // res.json(result)
    // res.render("index2");
  });
});
app.get("/register", (req, res) => {
  res.render("index3");
});

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});

// app.listen(PORT, () => {
//   console.log(`App listening on PORT: ${PORT}`);
// });
