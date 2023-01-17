import Sqlite3 from "better-sqlite3";
import _mysql from "mysql";
import createKnex, { Knex } from "knex";
import fs from "fs";

type SQLstring = string;

export function createDB(knexfileConfig: any) {
  const knex = createKnex(knexfileConfig);
  const db = knex as Knex & { sql: Function };
  db.sql = async function (commands: string) {
    const results = await this.raw(commands);
    return results[0];
  };
  return db;
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
export { createSQL, knex };
