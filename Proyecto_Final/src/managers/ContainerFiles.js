import fs from "fs";
import addId from "../helpers/addIdentificador.js";
import path from 'path'
import { fileURLToPath } from "url";
import { loggerFileError, loggerFileWarn } from "../logger/logger.js";

class ContainerFiles {
  constructor(filename) {
    this._filename = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", `files/${filename}`);
  }
  //METHODS
  save = async (body) => {
    try {
      if (fs.existsSync(this._filename)) {
        const content = await fs.promises.readFile(
          this._filename ,
          "utf8"
        );
        if (content) {
          const productos = JSON.parse(content);
          const newProduct = {
            id: addId(productos),
            ...body,
          };
          productos.push(newProduct);
          await fs.promises.writeFile(
            this._filename ,
            JSON.stringify(productos, null, 2)
          );
          return newProduct.id;
        } else {
          const newProduct = {
            id: 1,
            ...body,
          };
          await fs.promises.writeFile(
            this._filename ,
            JSON.stringify([newProduct], null, 2)
          );
          return newProduct.id;
        }
      } else {
        const newProduct = {
          id: 1,
          ...body,
        };
        await fs.promises.writeFile(
          this._filename ,
          JSON.stringify([newProduct], null, 2)
        );
        return newProduct.id;
      }
    } catch (error) {
      loggerFileError.error(error);
    }
  };

  getById = async (id) => {
    try {
      if (fs.existsSync(this._filename)) {
        const content = await fs.promises.readFile(
          this._filename,
          "utf8"
        );
        if (content) {
          const products = JSON.parse(content);
          const selectedProduct = products.find((item) => item.id === id);
          const finalProduct =
            selectedProduct === undefined ? null : selectedProduct;
          return finalProduct;
        } else {
          loggerFileWarn.warn("Document is empty");
        }
      } else {
        loggerFileWarn.warn("Document does not exist");
      }
    } catch (error) {
      loggerFileError.error(error);
    }
  };

  getAll = async () => {
    try {
      if (fs.existsSync(this._filename)) {
        const content = await fs.promises.readFile(
          this._filename,
          "utf8"
        );
        if (content) {
          const products = JSON.parse(content);
          return products;
        } else {
          loggerFileWarn.warn("Document is empty");
        }
      } else {
        loggerFileWarn.warn("Document does not exist");
      }
    } catch (error) {
      loggerFileError.error(error);
    }
  };

  deleteById = async (id) => {
    try {
      if (fs.existsSync(this._filename)) {
        const content = await fs.promises.readFile(
          this._filename,
          "utf8"
        );
        if (content) {
          const products = JSON.parse(content);
          const arrProductFiltered = products.filter((item) => item.id !== id);
          await fs.promises.writeFile(
            this._filename,
            JSON.stringify(arrProductFiltered, null, 2)
          );
        } else {
          loggerFileWarn.warn("Document is empty");
        }
      } else {
        loggerFileWarn.warn("Document does not exists");
      }
    } catch (error) {
      loggerFileError.error(error);
    }
  };

  deleteAll = async () => {
    try {
      if (fs.existsSync(this._filename)) {
        const content = await fs.promises.readFile(
            this._filename,
          "utf8"
        );
        if (content) {
          await fs.promises.writeFile(
            this._filename,
            JSON.stringify([])
          );
        }
      }
    } catch (error) {
      loggerFileError.error(error);
    }
  };

  updateById = async (id, body) => {
    try {
      const productos = await this.getAll();
      const productPos = productos.findIndex((item) => item.id === id);
      productos[productPos] = {
        id: id,
        ...body,
      };
      await fs.promises.writeFile(
        this._filename,
        JSON.stringify(productos, null, 2)
      );
      return;
    } catch (error) {
      loggerFileError.error(error);
    }
  };
}
export default ContainerFiles;
