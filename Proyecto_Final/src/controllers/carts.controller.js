import * as dotenv from "dotenv";
dotenv.config();
import addId from "../helpers/addIdentificador.js";
import { ContainerDaoCarts } from "../daos/index.js";
import { serviceProduct } from "./products.controller.js";
import { loggerFileWarn, logger } from "../logger/logger.js";
import { smsClient } from "../mailer/twilio.js";
import { mailTransport } from "../mailer/mailer.js";

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
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const cart = await serviceCart.getById(id);
    const cartProductsUpdated = cart.products.filter(
      (prod) => prod.id !== id_prod
    );
    const newCart = { ...cart, productos: cartProductsUpdated };
    await serviceCart.updateById(id, newCart);
    res.status(200).json({
      status: "OK",
      message: `Cart's products updated, product ID: ${id_prod} was deleted successfully`,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const orderCart = async (req, res) => {
  try {
      const {user} = req
      const id = req.params.id
      const cart = await serviceCart.getById(id)
      if(!cart) throw "cart does not exist" 
      if(cart.products.length === 0) throw "cart is empty, you cant order an empty cart"
      let pedidoProductos = new Array()
      pedidoProductos = cart.products
      let pedidoString = ''
      pedidoProductos.forEach((item)=>{
        pedidoString += `<li><span style="color: darkBlue;font-weight:bold;">ID: ${item._id}</span> ${item.name} <span style="font-weight:bold; color: purple;"> Precio: $${item.price}</span></li>`
      })

      mailTransport.sendMail({
				from: "server",
				to: process.env.ADMIN_MAIL,
				subject: `New Order from: ${user.name}`,
				html: `
				<div>
				<h1>NEW ORDER FROM ${user.name.toUpperCase()} </h1>
        <h2>Information</h2>
        <p>User name: ${user.name}</p>
        <p>UserID: ${user._id} </p>
        <p>Email: ${user.email}</p>
        <p>Pedido ID: ${id}</p>
				<h2>Products: </h2>
				<ul>
					${pedidoString}
				</ul>
				</div>
				`
			});

      smsClient.messages.create(
        {
          body: `A new order has been placed - Client name: ${user.name}, OrderId: ${id}, email:${user.email}`,
          from: `whatsapp:${process.env.TWILIO_WSP}`,
          to: `whatsapp:${process.env.ADMIN_PHONE}`,
        },
        (error) => {
          if (error) {
            updatedCart.warn(
              `It's has been an error sending the SMS to the admin ${error}`
            );
          } else {
            logger.info(
              `Message sent successfully`
            );
          }
        }
      );
      smsClient.messages.create(
        {
          body: `Your order has been placed and it's being processed`,
          from: `${process.env.TWILIO_PHONE}`,
          to: `${user.phone}`,
        },
        (error) => {
          if (error) {
            loggerFileWarn.warn(
              `It's has been an error sending the SMS to the client ${error}`
            );
          } else {
            logger.info(
              `Message sent successfully`
            );
          }
        }
      );
   
      res.status(200).json({
        status: "OK",
        message: `Your order has been placed`,
      });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

export {
  createCart,
  deleteCart,
  getCartProducts,
  addProductToCart,
  deleteProductFromCart,
  orderCart
};
