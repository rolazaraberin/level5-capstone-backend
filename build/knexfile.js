"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { Knex } = require("knex");
// const path = require("path");
// import dotenv from "dotenv";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const knexConfig = getConfig("mysql");
const knexConfig = getConfig("elephantsql");
exports.default = knexConfig;
function getConfig(configName) {
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
                connectionString: process.env.elephantsql,
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
                connectionString: process.env.remoteURL,
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
