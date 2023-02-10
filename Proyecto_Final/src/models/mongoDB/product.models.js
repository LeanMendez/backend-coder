import mongoose from "mongoose";
//Collections
export const productsCollection = "products";
//Schemas
export const productsSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    cod: { type: String },
    thumbnail: { type: String },
    price: { type: Number },
    stock: { type: Boolean },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const productModel = mongoose.model(productsCollection, productsSchema);
