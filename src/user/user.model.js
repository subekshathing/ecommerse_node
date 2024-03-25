import mongoose from "mongoose";
//set rule
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    requied: true,
    trim: true,
    maxlength: 30,
  },
  lastName: {
    type: String,
    requied: true,
    trim: true,
    maxlength: 30,
  },
  email: {
    type: String,
    requied: true,
    trim: true,
    maxlength: 65,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    requied: true,
    trim: true,
  },
  role: {
    type: String,
    requied: true,
    trim: true,
    enum: ["seller", "buyer"],
  },
  gender: {
    type: String,
    trim: true,
    enum: ["male", "female", "preferNotToSay"],
  },
});

//create schema
const User = mongoose.model("User", userSchema);

export default User;
