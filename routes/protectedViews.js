const path = require("path");

const apiAuth = require("../middleware/apiAuth");
const adminAuth = require("../middleware/adminAuth");

module.exports = (app) => {
  app.get(
    "/manager",
    /* apiAuth, adminAuth, */ (req, res) => {
      res.sendFile(path.join(__dirname, "../public/manager-portal.html"));
    }
  );

  app.get(
    "/user",
    /* apiAuth, */ (req, res) => {
      res.sendFile(path.join(__dirname, "../public/user-portal.html"));
    }
  );
};
