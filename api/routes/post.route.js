const express = require("express")
const verifyUser = require("../utils/verifyUser");
const { create, getposts, deletepost, updatepost } = require("../controllers/post.controller");

const postRouter = express.Router()

postRouter.post("/create", verifyUser, create)
postRouter.get("/getposts", getposts)
postRouter.delete("/deletepost/:postId/:userId", verifyUser, deletepost)
postRouter.put("/updatepost/:postId/:userId", verifyUser, updatepost)

module.exports = postRouter;