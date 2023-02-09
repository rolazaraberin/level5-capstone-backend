// "use strict";
// exports.__esModule = true;

// import "reflect-metadata";
// require("reflect-metadata");
import { DataSource } from "typeorm";
import User from "./src/models/entities/User";
import Login from "./src/models/entities/Login";
import addData1672176285655 from "./src/models/entities/1672176285655-addData";
// const { DataSource } = require("typeorm");
// const User = require("./build/models/entities/User");
// const Login = require("./build/models/entities/Login");
// const addData1672176285655 = require("./build/models/entities/1672176285655-addData");
// const { DataSource } = require("typeorm");
// const User = require("./src/models/entities/User");
// const Login = require("./src/models/entities/Login");
// const addData1672176285655 = require("./src/models/entities/1672176285655-addData");
import dotenv from "dotenv";
// import * as dotenv from "dotenv";
// const dotenv = require("dotenv");
dotenv.config();

// const AppDataSource: DataSource = getDataSource("mysql");
// const AppDataSource: DataSource = getDataSource("elephantsql");
const AppDataSource = getDataSource("cockroachdb");
// module.exports = AppDataSource;
// exports = AppDataSource;
export default AppDataSource;
// export { AppDataSource };
// export const AppDataSource = mysql();
// export const AppDataSource = elephantsql();

function getDataSource(dataSourceName: string) {
  // function getDataSource(dataSourceName) {
  const dataSources = {
    mysql: new DataSource({
      type: "mysql",
      host: "localhost",
      // port: 3306,
      username: process.env.mysqlUser,
      password: process.env.mysqlPassword,
      database: process.env.mysqlDatabase,
      synchronize: true,
      logging: false,
      entities: [User, Login],
      migrations: [addData1672176285655],
      subscribers: [],
    }),
    elephantsql: new DataSource({
      type: "postgres",
      // host: "localhost",
      // port: 3306,
      url: process.env.elephantsql,
      // username: process.env.mysqlUser,
      // password: process.env.mysqlPassword,
      // database: process.env.mysqlDatabase,
      synchronize: true,
      logging: false,
      entities: [User, Login],
      migrations: [addData1672176285655],
      subscribers: [],
    }),
    cockroachdb: new DataSource({
      type: "cockroachdb",
      // host: "process.env.cockroachdbHost",
      // port: process.env.cockroachdbPort,
      url: process.env.cockroachdb,
      // username: process.env.cockroachdbUser,
      // password: process.env.cockroachdbPassword,
      // database: process.env.cockroachdbDatabase,
      ssl: true,
      //ssl: { rejectUnauthorized: false }, // For insecure connections only
      synchronize: true,
      logging: false,
      entities: [User, Login],
      migrations: [addData1672176285655],
      subscribers: [],
    }),
  };
  return dataSources[dataSourceName];
}

// function mysql() {
//   return new DataSource({
//     type: "mysql",
//     host: "localhost",
//     // port: 3306,
//     username: process.env.mysqlUser,
//     password: process.env.mysqlPassword,
//     database: process.env.mysqlDatabase,
//     synchronize: true,
//     logging: false,
//     entities: [User, Login],
//     migrations: [addData1672176285655],
//     subscribers: [],
//   });
// }

// function elephantsql() {
//   return new DataSource({
//     type: "postgres",
//     // host: "localhost",
//     // port: 3306,
//     url: process.env.elephantsql,
//     // username: process.env.mysqlUser,
//     // password: process.env.mysqlPassword,
//     // database: process.env.mysqlDatabase,
//     synchronize: true,
//     logging: false,
//     entities: [User, Login],
//     migrations: [],
//     subscribers: [],
//   });
// }
