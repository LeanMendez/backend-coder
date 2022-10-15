const fs = require("fs");
const addId = require('./../helpers/addIdentificador')


class Contenedor {
  constructor(filename) {
    this._filename = filename;
  }

  //METHODS
  save = async (product) => {
    try {
      if (fs.existsSync(`./${this._filename}`)) {
        const content = await fs.promises.readFile(
          `./${this._filename}`,
          "utf8"
        );
        if (content) {
          const productos = JSON.parse(content);
          const newProduct = {
            id: addId(productos),
            ...product,
          };
          productos.push(newProduct);
          await fs.promises.writeFile(
            `./${this._filename}`,
            JSON.stringify(productos, null, 2)
          );
          return newProduct.id;
        } else {
          const newProduct = {
            id: 1,
            ...product,
          };
          await fs.promises.writeFile(
            `./${this._filename}`,
            JSON.stringify([newProduct], null, 2)
          );
          return newProduct.id;
        }
      } else {
        const newProduct = {
          id: 1,
          ...product,
        };
        await fs.promises.writeFile(
          `./${this._filename}`,
          JSON.stringify([newProduct], null, 2)
        );
        return newProduct.id;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      if (fs.existsSync(`./${this._filename}`)) {
        const content = await fs.promises.readFile(
          `./${this._filename}`,
          "utf8"
        );
        if (content) {
          const products = JSON.parse(content);
          const selectedProduct = products.find((item) => item.id === id);
          const finalProduct =
            selectedProduct === undefined ? null : selectedProduct;
          return finalProduct;
        } else {
          console.log("Document is empty");
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    try {
      if (fs.existsSync(`./${this._filename}`)) {
        const content = await fs.promises.readFile(
          `./${this._filename}`,
          "utf8"
        );
        if (content) {
          const products = JSON.parse(content);
          return products;
        } else {
          console.log("Document is empty");
        }
      } else {
        console.log("Document does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      if (fs.existsSync(`./${this._filename}`)) {
        const content = await fs.promises.readFile(
          `./${this._filename}`,
          "utf8"
        );
        if (content) {
          const products = JSON.parse(content);
          const arrProductFiltered = products.filter((item) => item.id !== id);
          await fs.promises.writeFile(
            `./${this._filename}`,
            JSON.stringify(arrProductFiltered, null, 2)
          );
        } else {
          console.log("Document is empty");
        }
      } else {
        console.log("Document does not exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      if (fs.existsSync(`./${this._filename}`)) {
        const content = await fs.promises.readFile(
          `./${this._filename}`,
          "utf8"
        );
        if (content) {
          await fs.promises.writeFile(
            `./${this._filename}`,
            JSON.stringify([])
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  updateById = async(id, body)=>{
    try {
        const productos = await this.getAll();
        const productPos = productos.findIndex((item)=>item.id === id);
        productos[productPos] = {
            id:id,
            ...body
        };
        await fs.promises.writeFile(this._filename, JSON.stringify(productos, null, 2))
        return
    } catch (error) {
        console.log(error)
    }
}
}

module.exports = Contenedor;
