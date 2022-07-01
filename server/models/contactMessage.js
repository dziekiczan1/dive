import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  email: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ContactMessage = mongoose.model("ContactMessage", contactSchema);

export default ContactMessage;
