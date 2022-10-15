const express = require("express");
const Router = express.Router();

const Contenedor = require("../components/contenedor");
const addId = require('./../helpers/addIdentificador')

const products = new Contenedor("productos.txt");

// GET  '/api/' -> devuelve un formulario para carga de productos
Router.get("/", (req, res) => {
  res.status(200).render("home");
});

// GET  '/api/' -> devuelve un listado de todos los productos
Router.get("/productos", async (req, res) => {
    res.status(200).render("productos", {products : await products.getAll()});
  });

// POST '/api/productos/form' -> recibe los productos desde el form
Router.post("/productos", async (req, res) => {
  const { body } = req;
  if (!body.title || !body.price || !body.thumbnail) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is empty in req.body: 'title', 'price', 'thumbnail'",
        },
      });
    return;
  }
  const productos = await products.getAll();
  const newProduct = {
    id: addId(productos),
    title: body.title,
    price: parseInt(body.price),
    thumbnail: body.thumbnail,
  };
  try {
    const createdProduct = await products.save(newProduct);
    res
      .status(201)
      .redirect("/");
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ status: "FAILED", data: { error: err?.message || err } });
  }
});

module.exports = Router;
