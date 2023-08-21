const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const { BlacklistModel } = require("../model/blacklistModel");
const userRouter = express.Router();

// user registration

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already exist, please login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          const user = new UserModel({ ...req.body, password: hash });
          await user.save();
          res.status(200).json({ msg: "User has been registered" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// user login

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "school");
          res
            .status(200)
            .json({ msg: "User Loggedin successfully", token: token });
        } else {
          res.status(200).json({ msg: "Invalid Credentials" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// user logout
userRouter.post("/logout", async (req,res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || null;
    if (token) {
      await BlacklistModel.updateMany({}, { $push: { blacklist: [token] } });
      res.status(200).json({ msg: "Logged out successsfully " });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { userRouter };
