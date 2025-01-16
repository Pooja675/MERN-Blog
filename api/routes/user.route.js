const express = require ("express");
const { test, updateUser, deleteUser, signout } = require("../controllers/user.controller");
const verifyUser = require("../utils/verifyUser");

const userRouter = express.Router()

userRouter.get("/test", test)
userRouter.put("/update/:userId",verifyUser, updateUser)
userRouter.delete("/delete/:userId",verifyUser, deleteUser)
userRouter.post("/signout", signout)

module.exports = userRouter;