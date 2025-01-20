const express = require("express")
const verifyUser = require("../utils/verifyUser");
const { create, getposts, deletepost } = require("../controllers/post.controller");

const postRouter = express()

postRouter.post("/create", verifyUser, create)
postRouter.get("/getposts", getposts)
postRouter.delete("/deletepost/:postId/:userId", verifyUser, deletepost)

module.exports = postRouter;