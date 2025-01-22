const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createComment, getPostComments, likeComment } = require("../controllers/comment.controller");

const commentRouter = express.Router()

commentRouter.post("/create", verifyUser,  createComment)
commentRouter.get("/getPostComments/:postId", getPostComments)
commentRouter.put("/likeComment/:commentId", verifyUser, likeComment)

module.exports = commentRouter;



