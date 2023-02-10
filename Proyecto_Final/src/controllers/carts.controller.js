import * as dotenv from "dotenv";
dotenv.config();
import addId from "../helpers/addIdentificador.js";
import { ContainerDaoCarts } from "../daos/index.js";
import { serviceProduct } from "./products.controller.js";
import { loggerFileWarn } from "../logger/logger.js";
import { smsClient } from "../mailer/twilio.js";
import { mailSender } from "../mailer/mailer.js";

const serviceCart = ContainerDaoCarts;

const createCart = async (req, res) => {
  try {
    const carts = await serviceCart.getAll();
    const newCart = {
      id: addId(carts),
      productos: [],
      timestamp: Date.now(),
    };
    serviceCart.save(newCart);
    res.status(201).json({
      status: "OK",
      data: {
        id: newCart.id,
        message: `Cart with ID: ${newCart.id} created successfully`,
      },
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: "FAILED", data: { error: err?.message || err } });
  }
};

const deleteCart = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cart = await serviceCart.getById(id);
    if (!cart) {
      res.status(400).json({
        status: "FAILED",
        data: { error: `Cart with ID: ${id} doesn't exist` },
      });
    }
    await serviceCart.deleteById(id);
    res.status(200).json({
      status: "OK",
      data: {
        message: `Cart with ID: ${req.params.id} deleted successfully`,
      },
    });
  } catch (error) {
    res
      .status(err.status || 500)
      .json({ status: "FAILED", data: { error: err?.message || err } });
  }
};

const getCartProducts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const cart = await serviceCart.getById(id);
    const arrProductos = cart.productos;
    res.status(200).json(arrProductos);
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: "FAILED", data: { error: err?.message || err } });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { user } = req;
    const id = req.params.id;
    const cart = await serviceCart.getById(id);
    if (!cart) {
      return res.status(404).send({ message: "Error el carrito no existe" });
    } else {
      const productId = req.body.id;
      const product = await serviceProduct.getById(productId);
      console.log(product)
      await cart.products.push(product);
      const updatedCart = await serviceCart.updateById(id, cart);
      if (updatedCart) {


        // ******************* FALTA EL MAILSENDER ***********************//
        /*ya esta importado, falta la implementacion, tiene que mandar un mail al administrador con una lista con todos los productos del carrito del pedido
        y en el asunto tiene que decir 'nuevo pedido de ' y el nombre y email del usuario que los solicitó */

        /*modificar el envio de whatsapp, el whatsapp tiene que ser del servidor al admin, mandando la lista de productos que solicito el 
        cliente, similar al mail de arriba */

        /*al cliente hay que mandarle un SMS, no un whatsapp, modificar eso tambien. El mensaje tiene que decir "su pedido ha sido recibido 
        y se encuentra en proceso" */
        smsClient.messages.create(
          {
            body: `Se registro un nuevo pedido! nombre: ${user.name}, pedido:${id}, email:${user.email}`,
            from: `whatsapp:${process.env.TWILIO_WSP}`,
            to: `whatsapp:${process.env.ADMIN_PHONE}`,
          },
          (error) => {
            if (error) {
              updatedCart.warn(
                `Hubo un error al enviar el mensaje de whatsapp al administrador ${error}`
              );
            } else {
              logger.info(
                `Mensaje de whatsapp de pedido enviado correctamente`
              );
            }
          }
        );
        smsClient.messages.create(
          {
            body: `Registramos un nuevo pedido tuyo! Estamos procesandolo.`,
            from: `whatsapp:${process.env.TWILIO_WSP}`,
            to: `whatsapp:${user.phone}`,
          },
          (error) => {
            if (error) {
              loggerFileWarn.warn(
                `Hubo un error al enviar el mensaje de whatsapp al cliente ${error}`
              );
            } else {
              logger.info(
                `Mensaje de whatsapp de pedido enviado correctamente`
              );
            }
          }
        );
      } else {
        loggerFileWarn.warn("error");
      }
      res.status(201).json({
        status: "OK",
        data: updatedCart,
        message: `Cart's products updated successfully, added product ID: ${productId}. Your order has been placed`,
      });
    }
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: "FAILED", data: { error: err?.message || err } });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const cart = await serviceCart.getById(id);
    const cartProductsUpdated = cart.productos.filter(
      (prod) => prod.id !== id_prod
    );
    const newCart = { ...cart, productos: cartProductsUpdated };
    await serviceCart.updateById(id, newCart);
    res.status(200).json({
      status: "OK",
      message: `Cart's products updated, product ID: ${id_prod} was deleted successfully`,
    });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: "FAILED", data: { error: err?.message || err } });
  }
};

export {
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
};
