import mongoose from "mongoose";
const EmailSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  subject: String,
  body: String,
  date: {
    type: Date,
    required: true,
  },
  image: String,
  name: {
    type: String,
    required: true,
  },
  starred: {
    default: false,
    type: Boolean,
    required: true,
  },
  bin: {
    default: false,
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const email = mongoose.model("emails", EmailSchema);
export default email;
