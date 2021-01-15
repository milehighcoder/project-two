const adminAuth = (req, res, next) => {
  if (req.user && req.user.email && req.user.isManager) {
    return next();
  }
  return res.status(401).send({ message: "You don't have admin access" });
};

module.exports = adminAuth;
