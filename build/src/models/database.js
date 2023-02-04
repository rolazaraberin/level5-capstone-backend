"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = exports.typeorm = exports.knex = void 0;
const db_1 = require("../utils/db");
const knexfile_1 = __importDefault(require("../../knexfile"));
const data_source_1 = __importDefault(require("../../data-source"));
// import createKnex from "knex";
// const db = createDB(knexfile.mysql);
_a = (0, db_1.createDB)({
    knexfileConfig: knexfile_1.default,
    AppDataSource: data_source_1.default,
}), exports.knex = _a.knex, exports.typeorm = _a.typeorm, exports.sql = _a.sql;
// const db: DB = createDB({ knexfileConfig, AppDataSource });
// let db: DB = createDB({ knexfileConfig, AppDataSource }).then((result: DB) => (db = result));
// const db = createDB(knexConfig);
// export default db;
