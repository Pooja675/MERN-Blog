const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createComment, getPostComments } = require("../controllers/comment.controller");

const commentRouter = express.Router()

commentRouter.post("/create", verifyUser,  createComment)
commentRouter.get("/getPostComments/:postId", getPostComments)

module.exports = commentRouter;



