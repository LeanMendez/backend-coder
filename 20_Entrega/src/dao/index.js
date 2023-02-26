import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { logger } from "../utils/logger/logger.js";
import { UserMongoDao } from "./users/mongo.dao.js";
import { UserModel } from "../db/models/user.model.js";

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new Error(`Error with Mongo-connection: ${err}`);
    logger.info("Connected to Mongo");
  }
);

//Instancio y exporto la clase que va a ser llamada en los controladores. Le paso el modelo de la entidad por el contructor.
const ContainerDaoUser = new UserMongoDao(UserModel);

export { ContainerDaoUser };
