
const express = require("express");
const appRouter = express.Router();

const Contenedor = require("../components/contenedor");
const addId = require('./../helpers/addIdentificador')

const products = new Contenedor("productos.txt");



// GET '/api/productos/' -> devuelve todos los productos.
appRouter.get("/productos", async (req, res) => {
  try {
    const productos = await products.getAll();
    res.status(200).json(productos);
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ status: "FAILED", data: { error: err.message || err } });
  }
});

// GET '/api/productos/:id' -> devuelve un producto según su id.
appRouter.get("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id);
    const product = await products.getById(productId);
    if (!product) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: `Can't find a product with ID: ${productId}` },
        });
    }
    res.status(200).send({ status: "OK", data: product });
  } catch (err) {
    res
      .status(err.status || 500)
      .send({ status: "FAILED", data: { error: err?.message || err } });
  }
});

// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
appRouter.post("/productos", async (req, res)=>{
  const {body} = req;
  if(!body.title || !body.price || !body.thumbnail){
    res.status(400).send({status: 'FAILED', data: {error: "One of the following keys is empty in req.body: 'title', 'price', 'thumbnail'"}})
    return
  }
  const productos = await products.getAll();
  const newProduct = {
    id: addId(productos),
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
  }
  try {
    const createdProduct = await products.save(newProduct)
  res.status(201).json({status: "OK", data: createdProduct, message: "Product created successfully"})
  } catch (err) {
    res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
  } 
})

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
appRouter.put("/productos/:id", async(req,res)=>{
  const {id} = req.params;
  const productId = parseInt(id);
  const updateInfo = req.body;
  if(!updateInfo.title || !updateInfo.price || !updateInfo.thumbnail){
    res.status(400).send({status: 'FAILED', data: {error: "One of the following keys is empty in req.body: 'title', 'price', 'thumbnail'"}})
    return
  }
  const newProduct = {
    id: productId,
    title: updateInfo.title,
    price: updateInfo.price,
    thumbnail: updateInfo.thumbnail,
  }
  try {
    const updatedProduct = await products.updateById(productId, newProduct)
  res.status(201).json({status: "OK", data: updatedProduct, message: `Product ID: ${productId} was updated successfully`})
  } catch (err) {
    res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
  }
})

// DELETE '/api/productos/:id' -> elimina un producto según su id.
appRouter.delete("/productos/:id", async(req, res)=>{
  const {id} = req.params;
  const productId = parseInt(id);
    const product = await products.getById(productId);
    if (!product) {
      res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: `Can't find a product with ID: ${productId}` },
        });
    }
  try {
    products.deleteById(parseInt(id))
  res.status(204).json({status: "OK", message: `Product ID:${id} was deleted successfully`})
  } catch (err) {
    res.status(err.status || 500).json({status: "FAILED", data: {error: err?.message || err}})
  }
})


module.exports = appRouter;
