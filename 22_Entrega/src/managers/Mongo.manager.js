class MongoContainer {
  constructor(userModel) {
    this.model = userModel;
  }

  async getById(id) {
    try {
      const object = await this.model.findById(id);
      if (!object) return { message: `Couldn't find item with ID ${id}` };
      return object;
    } catch (err) {
      return { message: `Error on method 'getById': ${err}` };
    }
  }

  async getAll() {
    try {
      const objects = await this.model.find();
      return objects;
    } catch (err) {
      return { message: `Error on method 'getAll': ${err}` };
    }
  }

  async save(body) {
    try {
      const item = await this.model.create(body);
      return item;
    } catch (err) {
      return { message: `Error on method 'save': ${err}` };
    }
  }

  async updateById(id, body) {
    try {
      await this.model.findByIdAndUpdate(id, body, { new: true });
      return { message: "Update was successfully" };
    } catch (err) {
      return { message: `Error on method 'updateById': ${err}` };
    }
  }

  async deleteById(id) {
    try {
      await this.model.findByIdAndDelete(id);
      return { message: "Delete was successfully apply" };
    } catch (err) {
      return { message: `Error on method 'deleteById': ${err}` };
    }
  }

  async deleteAll() {
    try {
      await this.model.delete({});
      return { message: "Delete was successfully apply" };
    } catch (err) {
      return { message: `Error on method 'deleteAll': ${err}` };
    }
  }
}

export { MongoContainer };
