const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const env = require("env");

const db = require("../models");

module.exports = function (app) {
  // GET route for getting all of the employees
  app.post("/auth/login", async (req, res) => {
    try {
      const user = await db.User.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        throw new Error("Incorrect Email Id/Password");
      }
      const reqPass = crypto
        .createHash("md5")
        .update(req.body.password || "")
        .digest("hex");
      if (reqPass !== user.password) {
        throw new Error("Incorrect Email Id/Password");
      }
      const token = jwt.sign(
        {
          user: {
            userId: user.id,
            email: user.email,
            createdAt: new Date(),
          },
        },
        process.env.SECRET || "SOME_SECRET_FOR_JWT_TOKEN"
      );
      delete user.dataValues.password;
      return res.send({ user, token });
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }

    // console.log(req.body);
    // Write code here to retrieve all of the todos from the database and res.json them back to the user
    /* db.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    }).then((result) => res.json(result)); */
  });

  app.post("/auth/register", async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        phone,
        password,
        isManager,
      } = req.body;

      const user = await db.User.findOne({
        where: { email },
      });

      if (user) {
        throw new Error("User already exists with same email");
      }
      const reqPass = crypto.createHash("md5").update(password).digest("hex");
      const payload = {
        first_name,
        last_name,
        email,
        phone,
        isManager,
        password: reqPass,
      };

      const newUser = await db.User.create(payload);
      return res.json({
        message: "User Creation Successful!",
      });
    } catch (err) {
      return res.status(403).send({
        message: err.message,
      });
    }
  });
};
