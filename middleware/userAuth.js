const adminAuth = (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next();
  }
  return res
    .status(401)
    .send({ message: "You don't have access to this user's data" });
};

module.exports = adminAuth;
