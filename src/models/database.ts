import { createDB } from "../utils/db";
import knexfile from "../../knexfile";

const db = createDB(knexfile.mysql);
export default db;
