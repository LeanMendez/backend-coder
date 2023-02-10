import { Router } from "express";
import {
  addProductToCart,
  createCart,
  deleteCart,
  deleteProductFromCart,
  getCartProducts,
  orderCart,
} from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.post("/", createCart);

cartRouter.post("/:id/productos", addProductToCart);

cartRouter.get("/:id/productos", getCartProducts);

cartRouter.delete("/:id", deleteCart);

cartRouter.delete("/:id/productos/:id_prod", deleteProductFromCart);

cartRouter.post("/:id/order", orderCart)

export { cartRouter };
