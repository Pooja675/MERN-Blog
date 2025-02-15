const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { userName, emailId, password } = req.body;

  if (
    !userName ||
    !emailId ||
    !password ||
    userName === "" ||
    emailId === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    userName,
    emailId,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json("Signup successfully...");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { emailId, password } = req.body;

  if (!emailId || !password || emailId === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ emailId });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const { password: pass, ...rest } = validUser._doc; //need to hide password

    const token = jwt.sign({ _id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  const { emailId, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ emailId });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc; //we have separated password
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      //if email not exist then create new user

      //creating random password
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        userName:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        emailId,
        password: hashPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save()
      const token = jwt.sign({ _id: newUser._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc; //we have separated password
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  google,
};
