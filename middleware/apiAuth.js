const { User } = require("../models");

const jwt = require("jsonwebtoken");

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers["x-token"])) {
    return res.status(401).send({ message: "Token is not provided" });
  }
  const token = req.headers["x-token"];
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET || "SOME_SECRET_FOR_JWT_TOKEN"
    );
    req.user = decoded.user;
    const user = await User.findOne({
      where: { email: req.user.email },
    });
    if (!user) {
      return res.status(401).send({ message: "User is not found in system" });
    }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (error) {
    return res.status(401).send({
      message: `Incorrect token is provided, try re-login. ${error.message}`,
    });
  }
};

module.exports = apiAuth;
