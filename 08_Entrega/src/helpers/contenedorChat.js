const fs = require("fs");
const path = require("path");
const addId = require("./addIdentificador");

class ContenedorChat {
  constructor(filename) {
    this.filename = path.join(__dirname, `/files/${filename}`);
  }
  //METHODS
  save = async (chatData) => {
    try {
      if (fs.existsSync(this.filename)) {
        const messages = await this.getAll();
        if (messages.length > 0) {
          const newId = addId(messages);
          const newMsg = {
            id: newId,
            ...chatData,
          };
          messages.push(newMsg);
          await fs.promises.writeFile(
            this.filename,
            JSON.stringify(messages, null, 2)
          );
        } else {
          const newMsg = {
            id: 1,
            ...chatData,
          };
          await fs.promises.writeFile(
            this.filename,
            JSON.stringify([newMsg], null, 2)
          );
        }
      } else {
        const newMsg = {
          id: 1,
          ...chatData,
        };
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify([newMsg], null, 2)
        );
      }
    } catch (error) {
      console.log(`Couldn't save message`);
      return error;
    }
  };

  getAll = async () => {
    try {
      if (fs.existsSync(this.filename)) {
        const content = await fs.promises.readFile(this.filename, "utf-8");
        if (content) {
          const historialMsgs = JSON.parse(content);
          return historialMsgs;
        } else {
          await fs.promises.writeFile(this.filename, JSON.stringify([]));
          return [];
        }
      } else {
        await fs.promises.writeFile(this.filename, JSON.stringify([]));
        return [];
      }
    } catch (error) {
      return "Document does not exist";
    }
  };
}

module.exports = ContenedorChat;
