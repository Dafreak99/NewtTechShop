const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

module.exports = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ error: "No token, authorization denied" });
  }

  try {
    let id = jwt.decode(req.headers.authorization);

    let user = await User.findById(id);
    if (!user) {
      return res.status(401).send({ error: "Unauthorizied" });
    }
    req.user = user;
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }

  next();
};
