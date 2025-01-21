const express = require("express");
const verifyUser = require("../utils/verifyUser");
const { createComment } = require("../controllers/comment.controller");

const commentRouter = express.Router()

commentRouter.post("/create", verifyUser,  createComment)

module.exports = commentRouter;



