const Comment = require("../models/comment.model");
const errorHandler = require("../utils/error");

const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user._id) {
      return next(
        errorHandler(403, "You are not allowed to create this comment")
      );
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });

    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {}
};

const getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments)
  } catch (error) {
    next(error);
  }
};

const likeComment = async (req, res, next) => {

  const comment = await Comment.findById(req.params.commentId);

  if(!comment){
    return next(errorHandler(404, "Comment not found"))
  }

  const userIndex = comment.likes.indexOf(req.user._id)

  if(userIndex === -1){
    comment.NumberOfLikes += 1;
    comment.likes.push(req.user._id)
  } else {
    comment.NumberOfLikes -= 1;
    comment.likes.splice(userIndex, 1);
  }

  await comment.save();
  res.status(200).json(comment)

}

module.exports = {
  createComment,
  getPostComments,
  likeComment,
};
