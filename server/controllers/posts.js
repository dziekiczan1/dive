import express from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

// config router

const router = express.Router();

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8; // limit na strone
    const startIndex = (Number(page) - 1) * LIMIT; // starting index kazdej strony
    const total = await PostMessage.countDocuments({ approved: true }); // calkowita liczba postow

    const posts = await PostMessage.find({ approved: true })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex); // {id: -1} da nam nowsze posty z przodu

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsAdmin = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8; // limit na strone
    const startIndex = (Number(page) - 1) * LIMIT; // starting index kazdej strony
    const total = await PostMessage.countDocuments({ approved: false }); // calkowita liczba postow
    const posts = await PostMessage.find({ approved: false })
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex); // {id: -1} da nam nowsze posty z przodu

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    //"i" to jest ignore case czyli jak bedzie Test test TEST to bedzie to samo
    const posts = await PostMessage.find({ title }
      // znajdz post ktory spelnia jedno z dwoch kryteriów ($or), oraz czy jeden z tagów ($in) w tablicy tagów spelnia kryteria. SPLIT jest uzyty bo wczesniej dalismy join
    );
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    //like the post
    post.likes.push(req.userId);
  } else {
    //dislike a post // zwraca tablice likes bez ID osoby ktora dala dislike
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const approvePost = async (req, res) => {
  // Update the product
  let productToUpdate = await PostMessage.findById(req.params.id);

  if (!productToUpdate) {
    throw new NotFoundError();
  }

  productToUpdate.set({ approved: true });
  await productToUpdate.save();

  res.json(productToUpdate);
};

export default router;
