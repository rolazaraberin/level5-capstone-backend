// const { Knex } = require("knex");
// const path = require("path");
// import dotenv from "dotenv";
import dotenv from "dotenv";
dotenv.config();

const config = {
  mode: "development",
  development: {
    client: "mysql",
    connection: {
      user: process.env.devUser,
      password: process.env.devPassword,
      database: process.env.devDatabase,
      multipleStatements: true,
    },
    migrations: {
      directory: "./src/models/migrations",
    },
    seeds: {
      directory: "./src/models/seeds",
    },
    useNullAsDefault: true,
  },
  mysql: {
    client: "mysql",
    connection: {
      user: process.env.devUser,
      password: process.env.devPassword,
      database: process.env.devDatabase,
      multipleStatements: true,
    },
    migrations: {
      directory: "./src/models/migrations",
    },
    seeds: {
      directory: "./src/models/seeds",
    },
    useNullAsDefault: true,
  },
  // development: {
  //   client: "better-sqlite3",
  //   connection: {
  //     filename: "./src/data/db.sqlite",
  //   },
  //   migrations: {
  //     directory: "./src/data/migrations",
  //   },
  //   seeds: {
  //     directory: "./src/data/seeds",
  //   },
  //   useNullAsDefault: true,
  // },
  remote: {
    client: "pg",
    // connection: process.env.remoteURL, //CONNECT TO ELEPHANTSQL.COM
    connection: {
      connectionString: process.env.remoteURL, //CONNECT TO ELEPHANTSQL.COM
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    useNullAsDefault: true,
    pool: { min: 0, max: 1 },
  },
};

export interface KnexConfig {
  mode: string;
  development: any;
  remote: any;
}
export default config;