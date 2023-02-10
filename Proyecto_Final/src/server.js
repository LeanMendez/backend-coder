import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import parseArgs from "minimist";
import os from "os";
import cluster from "cluster";

import { fileURLToPath } from "url";
import { productRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { isImplemented } from "./middlewares/routes404.js";
import { logger } from "./logger/logger.js";
import { authRouter } from "./routes/auth.routes.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//Arguments minimist
const optionsFork ={alias:{m:'mode'}, default:{mode:'FORK'}}
const objArguments = parseArgs(process.argv.slice(2), optionsFork)
const MODO = objArguments.mode
logger.info('objArg', MODO);



//inicializacion de la app
const PORT = process.env.PORT || 8080;
const app = express();

//middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//session configuracion
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false,
  })
);

// passport configuracion

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/productos", productRouter);
app.use("/api/carrito", cartRouter);
app.use("/api/auth", authRouter);
app.use("*", isImplemented);

// Fork and Cluster config
if (MODO === "CLUSTER" && cluster.isPrimary) {
  const numCPUS = os.cpus().length;

  for (let i = 0; i < numCPUS; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    logger.info(`el subproceso ${worker.process.pid} fallo`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
}
