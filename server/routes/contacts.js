import express from "express";
import {
  getContactMessage,
  createContactMessage,
  deleteContactMessage,
} from "../controllers/contact.js";

const router = express.Router();

router.get("/message", getContactMessage);
router.post("/", createContactMessage);
router.delete("/message/:id", deleteContactMessage);

export default router;
