import { MongoContainer } from "../../managers/Mongo.manager.js";
import { convertToDto } from "../../dto/user.dto.js";

//Implementacion del patron DAO, se instancia la clase base en el constructor
//Esta clase no interactua con la BBDD
class UserMongoDao extends MongoContainer {
  constructor(userModel) {
    super(userModel);
  }

  async getAll() {
    try {
      const response = await super.getAll();
      const data = JSON.parse(JSON.stringify(response));
      const responseDto = convertToDto(data);
      return responseDto;
    } catch (err) {
      throw new Error(`Error on method 'getAll': ${err}`);
    }
  }

  async getById(id) {
    try {
      const response = await super.getById(id);
      const data = JSON.parse(JSON.stringify(response));
      const responseDto = convertToDto(data);
      return responseDto;
    } catch (err) {
      throw new Error(`Error on method 'getById': ${err}`);
    }
  }

  async getByEmail(email) {
    try {
      const user = await super.getByEmail(email);
      return user;
    } catch (err) {
      throw new Error(`Error on method 'getByEmail': ${err}`);
    }
  }

  async save(newUser) {
    try {
      const user = await super.save(newUser);
      return user;
    } catch (err) {
      throw new Error(`Error on method 'createUser': ${err}`);
    }
  }
}

export { UserMongoDao };
