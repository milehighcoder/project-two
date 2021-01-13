const path = require("path");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index1.html"));
  });

  app.get("/portal", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index2.html"));
  });
};
