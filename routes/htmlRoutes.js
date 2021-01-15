const path = require("path");

module.exports = (app) => {
  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

  // Catch All that redirects the user to an appropriate view based on the request body
  app.get("/", (req, res) => {
    const { token } = req.body;
  });
};
