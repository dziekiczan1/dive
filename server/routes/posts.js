import express from "express";
import {
  getPost,
  getPosts,
  getPostsAdmin,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  approvePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/admin", getPostsAdmin);
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.patch("/:id/approvePost", auth, approvePost);
router.post("/:id/commentPost", auth, commentPost); // auth - musisz byc zalogowany zeby wykonac dana akcje

export default router;
