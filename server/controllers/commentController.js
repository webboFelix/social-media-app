import Comment from "../models/commentModel.js";

// Create a comment
export const createComment = async (req, res) => {
  const id = req.params.postId;
  const { comment, userName } = req.body;

  try {
    if (id) {
      const createdComment = await Comment.create({
        postId: id,
        comment,
        userName: userName ? userName : "Admin",
      });
      res.status(200).json(createdComment);
    } else {
      res.status(404).json({ message: "The post is not available..." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );

    if (updatedComment) {
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found..." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (deletedComment) {
      res.status(200).json({ message: "Comment deleted successfully..." });
    } else {
      res.status(404).json({ message: "Comment not found..." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Edit a reply
export const editReply = async (req, res) => {
  const { commentId, replyId } = req.params;
  const { reply } = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found..." });
    }

    const replyIndex = comment.replies.findIndex(
      (rep) => rep._id.toString() === replyId
    );
    if (replyIndex === -1) {
      return res.status(404).json({ message: "Reply not found..." });
    }

    comment.replies[replyIndex].reply = reply;
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete a reply
export const deleteReply = async (req, res) => {
  const { commentId, replyId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found..." });
    }

    const replyIndex = comment.replies.findIndex(
      (rep) => rep._id.toString() === replyId
    );
    if (replyIndex === -1) {
      return res.status(404).json({ message: "Reply not found..." });
    }

    comment.replies.splice(replyIndex, 1);
    await comment.save();

    res.status(200).json({ message: "Reply deleted successfully..." });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate("postId");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
