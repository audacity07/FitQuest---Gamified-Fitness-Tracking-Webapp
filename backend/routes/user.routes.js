const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { BlackListModel } = require("../model/blacklist.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msg: `This email has already been registered.` });
    }

    if (!testPassword(password)) {
      return res.status(400).json({
        msg: `Password doesn't follow required conditions. Change it.`,
      });
    }

    const hash = await bcrypt.hash(password, 5);
    const newUser = new UserModel({
      name,
      email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({
      msg: "The new user has been registered",
      registeredUser: { name, email },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: `User not registered` });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ msg: `Password is wrong` });
    }

    const token = jwt.sign({ name: user.name, userID: user._id }, "masai", {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign(
      { name: user.name, userID: user._id },
      "masai",
      {
        expiresIn: "28d",
      }
    );
    res.status(200).json({ msg: `Logged In`, token, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});
userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    let newToken = new BlackListModel({ token });
    await newToken.save();
    res.status(200).json({ msg: "User has been logged out" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});
function testPassword(password) {
  let num = false;
  let uppercase = false;
  let specialChar = false;
  let len = false;

  if (password.length >= 8) {
    len = true;
  }

  for (let val of password) {
    if (val >= "A" && val <= "Z") {
      uppercase = true;
    }
    if (val >= 0 && val <= 9) {
      num = true;
    }
    if (val === "@" || val === "#" || val === "$") {
      specialChar = true;
    }
  }
  if (num && uppercase && specialChar && len) {
    return true;
  } else {
    return false;
  }
}

module.exports = { userRouter };
