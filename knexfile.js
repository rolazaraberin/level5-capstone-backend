// const { Knex } = require("knex");
// const path = require("path");
// import dotenv from "dotenv";
const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./server/data/db.sqlite",
    },
    migrations: {
      directory: "./server/data/migrations",
    },
    seeds: {
      directory: "./server/data/seeds",
    },
    useNullAsDefault: true,
  },
  remote: {
    client: "pg",
    connection: process.env.remoteURL, //CONNECT TO ELEPHANTSQL.COM
    migrations: {
      directory: "./server/data/migrations",
    },
    seeds: {
      directory: "./server/data/seeds",
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
