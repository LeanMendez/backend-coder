//3rd parties imports
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import MongoStore from "connect-mongo";
import parseArgs from "minimist";
import cluster from "cluster";
import os from "os";

//local imports
import { logger } from "./utils/logger/logger.js";
import { userRouter } from "./routes/user.routes.js";
import {graphiqlRouter} from './routes/user.graphql.routes.js'


const optionsFork = { alias: { m: "mode" }, default: { mode: "FORK" } };
const objArguments = parseArgs(process.argv.slice(2), optionsFork);
const MODO = objArguments.mode;
logger.info("objArgu", "application running on mode:", MODO);

const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//routes
app.use('/api', userRouter )
app.use('/graphql', graphiqlRouter)


//cluster or fork mode
if (MODO === "CLUSTER" && cluster.isPrimary()) {
  const nCpus = os.cpus().length;
  for (let i = 0; i < nCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    logger.error(`el subproceso ${worker.process.pid} fallo`);
    cluster.fork();
  });
} else {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    logger.info(`app running on http://localhost:${PORT}`);
  });
}
