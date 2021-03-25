let User = require("../models/Users");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

let now = new Date();

module.exports = {
  getUser: async (req, res) => {
    try {
      let users = await User.find();
      res.send(users);
    } catch (error) {
      return res.status(500).send({ error: "Internal error !" });
    }
  },
  getUserInfo: async (req, res) => {
    let user = await User.findById(req.user.id).select("-password");
    res.send({ user });
  },
  postSignUp: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) return res.status(401).send({ error: "Email already taken !" });

      user = new User({ username, email, password, date: now });
      user.password = await bcrypt.hash(user.password, 8);

      let token = await jwt.sign(user.id, "lenient");

      await user.save();

      res.send({ token });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  },

  postSignIn: async (req, res) => {
    const { username, password } = req.body;

    try {
      let matchedUser = await User.findOne({ username });
      console.log(matchedUser);
      if (!matchedUser)
        return res.status(404).send({ error: "Invalid Credentials !" });

      let isMatch = await bcrypt.compare(password, matchedUser.password);

      if (!isMatch)
        return res.status(404).send({ error: "Invalid Credentials !" });

      const token = await jwt.sign(matchedUser.id, "lenient");

      let returnUser = {
        _id: matchedUser._id,
        username: matchedUser.username,
        email: matchedUser.email,
        date: matchedUser.date,
      };

      res.send({ token, user: returnUser });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  },
};
