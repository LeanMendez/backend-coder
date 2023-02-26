import { MongoContainer } from "../../managers/Mongo.manager.js";

class UserMongoDao extends MongoContainer {
  constructor(userModel) {
    super(userModel);
  }
}

export { UserMongoDao };
