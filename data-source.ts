import "reflect-metadata";
import { DataSource } from "typeorm";
import User from "./src/models/entities/User";
import Login from "./src/models/entities/Login";
import addData1672176285655 from "./src/models/entities/1672176285655-addData";
// import dotenv from "dotenv";
import * as dotenv from "dotenv";
dotenv.config();

// const AppDataSource: DataSource = getDataSource("mysql");
const AppDataSource: DataSource = getDataSource("elephantsql");
export default AppDataSource;
// export { AppDataSource };
// export const AppDataSource = mysql();
// export const AppDataSource = elephantsql();

function getDataSource(dataSouceName: string) {
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
  };
  return dataSources[dataSouceName];
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
