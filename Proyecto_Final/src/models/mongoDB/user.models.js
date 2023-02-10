import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: false },
  avatar: { type: String, required: true },
});


export const UserModel = mongoose.model(userCollection, userSchema)