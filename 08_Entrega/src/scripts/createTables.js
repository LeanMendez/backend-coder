const options = require("../config/databaseConfig");
const knex = require("knex");

const dbmysql = knex(options.mariaDB);
const dbsqlite = knex(options.sqlite);

const createTables = async () => {
  try {
    const tableProductsExists = await dbmysql.schema.hasTable("products");
    if (tableProductsExists) {
      await dbmysql.schema.dropTable("products");
    }
    await dbmysql.schema.createTable("products", (table) => {
      table.increments("id");
      table.string("title", 40).notNullable();
      table.integer("price").notNullable();
      table.string("thumbnail", 250).notNullable();
    });
    console.log("table products created successfully");
    dbmysql.destroy();

    const tableMessageExists = await dbsqlite.schema.hasTable("chat");

    if (tableMessageExists) {
      await dbsqlite.schema.dropTable("chat");
    }
    await dbsqlite.schema.createTable("chat", (table) => {
      table.increments("id");
      table.string("email", 30).nullable(false);
      table.string("timestamp", 20).nullable(false);
      table.string("msg", 200).nullable(false);
    });
    console.log("table chat created successfully");
    dbsqlite.destroy();
  } catch (err) {
    console.log(err);
  }
};

createTables();
