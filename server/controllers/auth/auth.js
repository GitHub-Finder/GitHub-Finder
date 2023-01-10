const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (email) => {
  const payload = { email };
  return jwt.sign(payload, process.env.SECRET || "SECRET", {
    expiresIn: "24h",
  });
};

// sign-up
router.post(
  "/sign-up",
  [
    check("name", "Name has not to be empty.").notEmpty(),
    check("password", "Password has not to be empty.").isLength({ min: 5 }),
    check("email", "Email has not to be empty.").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(403).json(errors);
      }
      const userFound = await User.findOne({ name: req.body.name }).exec();
      if (userFound) {
        return res
          .status(401)
          .json({ message: "User with the GitHub login already exists" });
      }

      const user = await User.create({ ...req.body, status: 0 });
      const token = generateAccessToken(user.email);

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

// sign-in
router.post(
  "/sign-in",
  [
    check("password", "Password has not to be empty.").notEmpty(),
    check("email", "Email has not to be empty").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(403).json(errors);
      }
      console.log("TEST1");
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect" });
      }
      console.log("TEST2");
      const checkPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!checkPassword) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect" });
      }
      console.log("TEST3");
      const token = generateAccessToken(user.email);
      return res.status(200).json({ token: token, name: user.name });
    } catch (err) {
      return res.status(403).json({ error: err.message });
    }
  }
);

module.exports = router;
