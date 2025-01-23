const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createComment, getPostComments, likeComment, editComment, deleteComment, getcomments } = require("../controllers/comment.controller");

const commentRouter = express.Router()

commentRouter.post("/create", verifyUser,  createComment)
commentRouter.get("/getPostComments/:postId", getPostComments)
commentRouter.put("/likeComment/:commentId", verifyUser, likeComment)
commentRouter.put("/editComment/:commentId", verifyUser, editComment)
commentRouter.delete("/deleteComment/:commentId", verifyUser, deleteComment)
commentRouter.get("/getcomments",verifyUser, getcomments)

module.exports = commentRouter;



