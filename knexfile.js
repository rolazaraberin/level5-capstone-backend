// const { Knex } = require("knex");
// const path = require("path");
// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./src/data/db.sqlite",
    },
    migrations: {
      directory: "./src/data/migrations",
    },
    seeds: {
      directory: "./src/data/seeds",
    },
    useNullAsDefault: true,
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

module.exports = config;
