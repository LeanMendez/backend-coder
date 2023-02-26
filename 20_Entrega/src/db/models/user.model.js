import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const userCollection = "users";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = mongoose.model(userCollection, userSchema);
