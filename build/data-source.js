"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("./src/models/entities/User"));
const Login_1 = __importDefault(require("./src/models/entities/Login"));
const _1672176285655_addData_1 = __importDefault(require("./src/models/entities/1672176285655-addData"));
// import dotenv from "dotenv";
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// const AppDataSource: DataSource = getDataSource("mysql");
const AppDataSource = getDataSource("elephantsql");
exports.default = AppDataSource;
// export { AppDataSource };
// export const AppDataSource = mysql();
// export const AppDataSource = elephantsql();
function getDataSource(dataSouceName) {
    const dataSources = {
        mysql: new typeorm_1.DataSource({
            type: "mysql",
            host: "localhost",
            // port: 3306,
            username: process.env.mysqlUser,
            password: process.env.mysqlPassword,
            database: process.env.mysqlDatabase,
            synchronize: true,
            logging: false,
            entities: [User_1.default, Login_1.default],
            migrations: [_1672176285655_addData_1.default],
            subscribers: [],
        }),
        elephantsql: new typeorm_1.DataSource({
            type: "postgres",
            // host: "localhost",
            // port: 3306,
            url: process.env.elephantsql,
            // username: process.env.mysqlUser,
            // password: process.env.mysqlPassword,
            // database: process.env.mysqlDatabase,
            synchronize: true,
            logging: false,
            entities: [User_1.default, Login_1.default],
            migrations: [_1672176285655_addData_1.default],
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
