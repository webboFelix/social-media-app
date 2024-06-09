import express from "express";
import authMiddleWare from "../middleware/AuthMiddleware.js";
import {
  createComment,
  editComment,
  deleteComment,
  editReply,
  deleteReply,
  getAllComments,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/:postId/createComment", createComment);
router.put("/:commentId/editComment", editComment);
router.delete("/:commentId/deleteComment", deleteComment);
router.put("/:commentId/editReply/:replyId", editReply);
router.delete("/:commentId/deleteReply/:replyId", deleteReply);
router.get("/", getAllComments);

export default router;
