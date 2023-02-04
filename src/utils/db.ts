import Sqlite3 from "better-sqlite3";
import _mysql from "mysql";
import createKnex, { Knex } from "knex";
import fs from "fs";
import { DataSource, EntityManager, QueryBuilder } from "typeorm";
// import { merge } from "lodash";
// import AppDataSource from "../../data-source";

type SQLstring = string;
export type DB = {
  knex: Knex;
  sql: Function;
  typeorm: DataSource;
  // typeorm: QueryBuilder<any> & EntityManager;
};

function createDB({
  knexfileConfig,
  AppDataSource,
}: {
  knexfileConfig?: any;
  AppDataSource?: DataSource;
}) {
  // let typeorm: DataSource, knex: Knex, sql: Function;
  // const db = {} as DB;
  let result: any, sql: Function, knex: Knex, typeorm: DataSource;
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

function getKnex(knexfileConfig: any) {
  if (!knexfileConfig) return { knex: undefined, sql: undefined };
  const knex = createKnex(knexfileConfig);
  const sql = async function (commands: SQLstring, parameters?: any[]) {
    const results = await knex.raw(commands, parameters);
    return results[0];
  };
  return { knex, sql };
}

function getTypeorm(appDataSource: DataSource) {
  if (!appDataSource) return { typeorm: undefined, sql: undefined };
  const typeorm = appDataSource;
  typeorm.initialize();
  const sql = async function (sqlCommands: SQLstring, parameters?: any[]) {
    const results = await typeorm.query(sqlCommands, parameters);
    // return results[0];
    return results;
  };
  return { typeorm, sql };
}

const knex = createKnex({
  client: "mysql",
  connection: {
    user: "root",
    password: "password",
    database: "sql_apprentice_2",
    multipleStatements: true,
  },
});

class SQL extends Sqlite3 {
  constructor(public cwd: string, public filename: string) {
    super(cwd + "/" + filename);
  }
  runQuery(query: SQLstring, label = "") {
    const results = this.prepare(query).all();
    console.log(label, "\n", results, "\n");
    return results;
  }
  runFile(filename: string, cwd = this.cwd) {
    const SQLcommands = fs.readFileSync(cwd + "/" + filename);
    this.exec(SQLcommands.toString());
  }
}

function createSQL(cwd: string, filename: string) {
  const mysql: any = _mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    // database: cwd + "/" + filename,
  });
  console.log("SUCCESSFUL CONNECTION!");
  mysql.raw = _mysql.raw;
  return mysql;
}

export default SQL;
export { createSQL, knex, createDB };
