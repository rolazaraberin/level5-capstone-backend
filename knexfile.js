// const { Knex } = require("knex");
// const path = require("path");

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
};

module.exports = config;
