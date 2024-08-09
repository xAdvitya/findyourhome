import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
import {
  getPosts,
  getPost,
  updatePost,
  addPosts,
  deletePost,
} from "../controllers/post.controller.js";

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);
router.post("/", verifyToken, addPosts);

export default router;
