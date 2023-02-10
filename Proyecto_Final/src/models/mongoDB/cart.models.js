import mongoose from "mongoose";
import { productsSchema } from "./product.models.js";

export const cartsCollection = "carts";
export const cartsSchema = new mongoose.Schema(
  {
    products: [productsSchema],
    status: { type: String },
    userId: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const cartModel = mongoose.model(cartsCollection, cartsSchema);
