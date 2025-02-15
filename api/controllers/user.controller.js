const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");

const test = (req, res) => {
  res.json({ message: "API is working!!! " });
};

const updateUser = async (req, res, next) => {
  //console.log(req.user);
  if (req.user._id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to edit this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be atleast 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.userName) {
    if (req.body.userName < 7 || req.body.userName > 20) {
      return next(
        errorHandler(400, "UserName must be between 7 and 20 characters")
      );
    }
    if (req.body.userName.includes(" ")) {
      return next(errorHandler(400, "UserName cannot contain space"));
    }
    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          userName: req.body.userName,
          emailId: req.body.emailId,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user._id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted!!");
  } catch (error) {
    next(error);
  }
};

const signout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_Token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

const getusers = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }

  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

      const userWithoutPassword = users.map((user) => { //getting array of users without password 
        const {password, ...rest} = user._doc;
        return rest;
      })

      const totalUsers = await User.countDocuments();

      const now = new Date();

      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
      )

      const lastMonthUsers = await User.countDocuments({
        createdAt: {$gte: oneMonthAgo}
      })

      res.status(200).json({
        users:userWithoutPassword,
        totalUsers,
        lastMonthUsers,
      })
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {

    const user = await User.findById(req.params.userId)
    if(!user){
      return next(errorHandler(404, "User not found"))
    }
    const {password, ...rest} = user._doc;
    res.status(200).json(rest)
    
  } catch (error) {
    next(error)
  }
}

module.exports = {
  test,
  updateUser,
  deleteUser,
  signout,
  getusers,
  getUser,
};
