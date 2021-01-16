const express = require("express");
const bodyParser = require("body-parser");
// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

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


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


require("./routes/authRoutes")(app);
require("./routes/htmlRoutes")(app);

require("./routes/apiRoutes")(app);
require("./routes/protectedViews")(app);


app.get('/', (req, res) => {
  res.render('index1');
});

app.get('/Portal', (req, res) => {
  res.render('index2');
});



// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});

// app.listen(PORT, () => {
//   console.log(`App listening on PORT: ${PORT}`);
// });