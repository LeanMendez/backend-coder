const express = require("express");
const app = express();
const Contenedor = require("./contenedor");

app.use(express.json());
const products = new Contenedor("productos.txt");
const PORT = 8080;

//END-POINTS
app.get("/", async (req, res) => {
  res.send("<h1>API DE PRODUCTOS</h1>");
});

app.get("/productos", async (req, res) => {
  const allProducts = await products.getAll();
  res.json(allProducts);
});

app.get("/productoRandom", async (req, res) => {
  const allProducts = await products.getAll();
  const idMax = allProducts.length;
  const randomId = generateRandomNumber(1, idMax);
  const randomProd = await products.getById(randomId);
  res.json(randomProd);
});

//HELPER
const generateRandomNumber = (min, max) => {
  const randomNumber = Math.floor(Math.random() * (max + 1 - min) + min);
  return randomNumber;
};

app.listen(8080, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
