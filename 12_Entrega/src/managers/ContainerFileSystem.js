import fs from "fs";
import { addId } from "../helpers/addId.js";

class ContainerFileSystem {
  constructor(data) {
    this.data = data;
    this.object = this.readData(this.data) || [];
  }

  async getAll() {
    try {
      const data = await this.readData(this.data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async save(body) {
    try {
      const data = await this.getAll();
      const newId = addId(data);
      const newMsg = {
        id: newId,
        autor: {
          id: body.id,
          nombre: body.nombre,
          edad: body.edad,
          alias: body.alias,
          avatar: body.avatar,
        },
        texto: body.texto,
        hora: body.hora,
      };
      data.push(newMsg);
      this.reWriteData(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  //functiones para no repetir el uso de fs
  readData(path) {
    const result = JSON.parse(fs.readFileSync(path, "utf-8"));
    return result;
  }
  reWriteData(object) {
    fs.writeFileSync(this.data, JSON.stringify(object, null, 2));
  }
}

export { ContainerFileSystem };
