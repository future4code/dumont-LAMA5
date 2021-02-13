import knex from "knex";
import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export class BaseDatabase {
  static destroyConnection() {
    throw new Error("Method not implemented.");
  }
  protected static connection: Knex = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
}
