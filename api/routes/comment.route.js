const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createComment, getPostComments, likeComment, editComment, deleteComment } = require("../controllers/comment.controller");

const commentRouter = express.Router()

commentRouter.post("/create", verifyUser,  createComment)
commentRouter.get("/getPostComments/:postId", getPostComments)
commentRouter.put("/likeComment/:commentId", verifyUser, likeComment)
commentRouter.put("/editComment/:commentId", verifyUser, editComment)
commentRouter.delete("/deleteComment/:commentId", verifyUser, deleteComment)

module.exports = commentRouter;



