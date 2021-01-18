const { User } = require("../models");

const jwt = require("jsonwebtoken");

const apiAuth = async (req, res, next) => {
  if (!(req.headers && req.headers["x-token"])) {
    return res.redirect(401, "/");
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
      return res.redirect(401, "/");
    }
    const reqUser = { ...user.get() };
    reqUser.userId = user.id;
    req.user = reqUser;
    return next();
  } catch (error) {
    return res.redirect(401, "/");
  }
};

module.exports = apiAuth;
