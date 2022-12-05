import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  mariaDB: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "coderhousedb",
    },
  },
  fileSystem: {
    pathProd: path.join(__dirname, "../files/products.txt"),
    pathCart: path.join(__dirname, "../files/carts.txt"),
  },
};

export const config = {
  isAdmin: true,
};

export default options;
