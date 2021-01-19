const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { User } = require("../models");

const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({
      where: { id: userId },
    });

    const reqPass = crypto
      .createHash("md5")
      .update(req.body.oldPassword)
      .digest("hex");
    if (reqPass !== user.password) {
      throw new Error("Old password is incorrect");
    }

    const newPass = crypto
      .createHash("md5")
      .update(req.body.newPassword)
      .digest("hex");

    await User.update({ password: newPass }, { where: { id: user.id } });
    return res
      .status(200)
      .send({ message: "User password got updated successfully!" });
  } catch ({ message }) {
    return res.status(500).send({ message });
  }
};

const updateDetails = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, userId } = req.body;
    await User.update(
      { first_name, last_name, email, phone },
      { where: { id: userId } }
    );
    return res.status(200).send({ message: "User got updated successfully!" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  profile,
  changePassword,
  updateDetails,
};
