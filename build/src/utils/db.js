"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDB = exports.knex = exports.createSQL = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const mysql_1 = __importDefault(require("mysql"));
const knex_1 = __importDefault(require("knex"));
const fs_1 = __importDefault(require("fs"));
function createDB({ knexfileConfig, AppDataSource, }) {
    // let typeorm: DataSource, knex: Knex, sql: Function;
    // const db = {} as DB;
    let result, sql, knex, typeorm;
    result = getKnex(knexfileConfig);
    knex = result.knex;
    sql = result.sql;
    // if (knexfileConfig) {
    //   knex = createKnex(knexfileConfig);
    //   // db.knex = createKnex(knexfileConfig);
    //   // db.sql = async function (commands: SQLstring) {
    //   sql = async function (commands: SQLstring) {
    //     // const results = await this.raw(commands);
    //     const results = await knex.raw(commands);
    //     // const results = await db.knex.raw(commands);
    //     return results[0];
    //   };
    // }
    result = getTypeorm(AppDataSource);
    typeorm = result.typeorm;
    sql = result.sql;
    // if (AppDataSource)
    //   AppDataSource.initialize().then((dataSource: DataSource) => {
    //     typeorm = dataSource;
    //     // db.typeorm = dataSource;
    //     // db.typeorm = dataSource.manager as DB["typeorm"];
    //     // merge(db.typeorm, dataSource.manager.createQueryBuilder());
    //     // db.typeorm = result.manager.createQueryBuilder();
    //     sql = async function (sqlCommands: SQLstring) {
    //       const results = await typeorm.query(sqlCommands);
    //       return results[0];
    //     };
    //   });
    return { knex, typeorm, sql };
    // return db;
}
exports.createDB = createDB;
function getKnex(knexfileConfig) {
    if (!knexfileConfig)
        return { knex: undefined, sql: undefined };
    const knex = (0, knex_1.default)(knexfileConfig);
    const sql = function (commands, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield knex.raw(commands, parameters);
            return results[0];
        });
    };
    return { knex, sql };
}
function getTypeorm(appDataSource) {
    if (!appDataSource)
        return { typeorm: undefined, sql: undefined };
    const typeorm = appDataSource;
    typeorm.initialize();
    const sql = function (sqlCommands, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield typeorm.query(sqlCommands, parameters);
            // return results[0];
            return results;
        });
    };
    return { typeorm, sql };
}
const knex = (0, knex_1.default)({
    client: "mysql",
    connection: {
        user: "root",
        password: "password",
        database: "sql_apprentice_2",
        multipleStatements: true,
    },
});
exports.knex = knex;
class SQL extends better_sqlite3_1.default {
    constructor(cwd, filename) {
        super(cwd + "/" + filename);
        this.cwd = cwd;
        this.filename = filename;
    }
    runQuery(query, label = "") {
        const results = this.prepare(query).all();
        console.log(label, "\n", results, "\n");
        return results;
    }
    runFile(filename, cwd = this.cwd) {
        const SQLcommands = fs_1.default.readFileSync(cwd + "/" + filename);
        this.exec(SQLcommands.toString());
    }
}
function createSQL(cwd, filename) {
    const mysql = mysql_1.default.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        // database: cwd + "/" + filename,
    });
    console.log("SUCCESSFUL CONNECTION!");
    mysql.raw = mysql_1.default.raw;
    return mysql;
}
exports.createSQL = createSQL;
exports.default = SQL;
