import express from "express";
import mongoose from "mongoose";

import ContactMessage from "../models/contactMessage.js";

// config router

const router = express.Router();

// export const getContactMessage = async (req, res) => {
//   try {
//     const posts = await ContactMessage.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getContactMessage = async (req, res) => {
  try {
    const post = await ContactMessage.find().sort({ _id: -1 });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createContactMessage = async (req, res) => {
  const post = req.body;

  const newPost = new ContactMessage({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await ContactMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export default router;
