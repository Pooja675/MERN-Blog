const express = require ("express");
const { test, updateUser } = require("../controllers/user.controller");
const verifyUser = require("../utils/verifyUser");

const userRouter = express.Router()

userRouter.get("/test", test)
userRouter.put("/update/:userId",verifyUser, updateUser)

module.exports = userRouter;