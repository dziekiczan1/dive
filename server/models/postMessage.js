import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  city: String,
  title: String,
  message: String,
  name: String,
  creator: String,
  maxdepth: Number,
  typeofspot: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  approved: {
    type: Boolean,
    default: false,
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
