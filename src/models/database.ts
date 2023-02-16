// import { createDB, DB } from "../utils/db";
// import { getKnex, getTypeorm, getSqlTypeorm, Databases } from "../utils/db";
import Database from "../utils/Database";
import knexfileConfig from "../../knexfile";
import AppDataSource from "../../data-source";
// import createKnex from "knex";

// const db = createDB(knexfile.mysql);
// let knex: any, typeorm: any, sql: any;

const database = new Database();
database.configureKnex(knexfileConfig);
database.configureTypeorm(AppDataSource);
database.configureSqlTypeorm();
const { knex, typeorm, sql } = database;

// const knex = getKnex(knexfileConfig);
// const typeorm = await getTypeorm(AppDataSource);
// const sql = await getSqlTypeorm(typeorm);
// const sql = getSqlTypeorm(AppDataSource);

export { knex, typeorm, sql };

// async function isDatabaseReady() {
//   await typeorm;
//   await sql;
//   return true;
// }
// async function getDatabases() {
//   // const databases = {} as Databases;
//   // databases.knex = getKnex(knexfileConfig);
//   // databases.typeorm = await getTypeorm(AppDataSource);
//   // databases.sql = await getSqlTypeorm(AppDataSource);
//   const knex =
//   const typeorm = await getTypeorm(AppDataSource);
//   const sql = ;
//   return { knex, typeorm, sql };
// }

// export { knex, typeorm, sql };
// export const { knex, typeorm, sql } = createDB({
//   knexfileConfig,
//   AppDataSource,
// });
// const db: DB = createDB({ knexfileConfig, AppDataSource });
// let db: DB = createDB({ knexfileConfig, AppDataSource }).then((result: DB) => (db = result));
// const db = createDB(knexConfig);
// export default db;
