const express = require("express")
const verifyUser = require("../utils/verifyUser");
const { create, getposts } = require("../controllers/post.controller");

const postRouter = express()

postRouter.post("/create", verifyUser, create)
postRouter.get("/getposts", getposts)

module.exports = postRouter;