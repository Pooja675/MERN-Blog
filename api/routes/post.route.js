const express = require("express")
const verifyUser = require("../utils/verifyUser");
const { create } = require("../controllers/post.controller");

const postRouter = express()

postRouter.post("/create", verifyUser, create)

module.exports = postRouter;