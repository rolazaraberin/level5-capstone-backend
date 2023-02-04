// const { Knex } = require("knex");
// const path = require("path");
// import dotenv from "dotenv";
import dotenv from "dotenv";
dotenv.config();

// const knexConfig = getConfig("mysql");
const knexConfig = getConfig("elephantsql");
export default knexConfig;

export interface KnexConfig {
  mode: string;
  development: any;
  remote: any;
}

function getConfig(configName: string) {
  const configurations = {
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
    sqlite: {
      client: "better-sqlite3",
      connection: {
        filename: "./src/models/db.sqlite",
      },
      migrations: {
        directory: "./src/models/migrations",
      },
      seeds: {
        directory: "./src/models/seeds",
      },
      useNullAsDefault: true,
    },
    elephantsql: {
      client: "pg",
      // connection: process.env.remoteURL, //CONNECT TO ELEPHANTSQL.COM
      connection: {
        connectionString: process.env.elephantsql, //CONNECT TO ELEPHANTSQL.COM
        ssl: { rejectUnauthorized: false },
      },
      migrations: {
        directory: "./src/models/migrations",
      },
      seeds: {
        directory: "./src/models/seeds",
      },
      useNullAsDefault: true,
      pool: { min: 0, max: 1 },
    },
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
  return configurations[configName];
}
