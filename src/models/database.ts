import { createDB, DB } from "../utils/db";
import knexfileConfig from "../../knexfile";
import AppDataSource from "../../data-source";
// import createKnex from "knex";

// const db = createDB(knexfile.mysql);
export const { knex, typeorm, sql } = createDB({
  knexfileConfig,
  AppDataSource,
});
// const db: DB = createDB({ knexfileConfig, AppDataSource });
// let db: DB = createDB({ knexfileConfig, AppDataSource }).then((result: DB) => (db = result));
// const db = createDB(knexConfig);
// export default db;
