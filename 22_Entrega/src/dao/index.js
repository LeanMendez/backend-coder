import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import { logger } from "../utils/logger/logger.js";
import { UserMongoDao } from "./users/mongoDao.js";
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

const ContainerDaoUser = new UserMongoDao(UserModel);

export { ContainerDaoUser };
