import Database from "../utils/Database";
import knexfileConfig from "../../knexfile";
import AppDataSource from "../../data-source";

const database = new Database();
database.configureKnex(knexfileConfig);
database.configureTypeorm(AppDataSource);
database.configureSqlTypeorm();
const { knex, typeorm, sql } = database;

export { knex, typeorm, sql };
