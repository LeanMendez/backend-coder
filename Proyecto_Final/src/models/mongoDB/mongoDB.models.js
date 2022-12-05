import mongoose from "mongoose";

//Schemas
const productsSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    cod: { type: Number },
    thumbnail: { type: String },
    price: { type: Number },
    stock: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartsSchema = new mongoose.Schema(
  {
    products: [
      {
        id: { type: Number },
        name: { type: String },
        description: { type: String },
        cod: { type: Number },
        thumbnail: { type: String },
        price: { type: Number },
        stock: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Collections
const productsCollection = "products";
const cartsCollection = "carts";

export { productsSchema, productsCollection, cartsSchema, cartsCollection };
