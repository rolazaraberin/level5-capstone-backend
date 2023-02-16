import { sql } from "../models/database";

export { getItemById };

async function getItemById(id: number) {
  await sql.initialize();
  const table = "item";
  const primaryKey = "id";
  const value = Number(id);
  const command = `SELECT * FROM ${table} WHERE ${primaryKey} = ${value}`;
  const result = await sql(command);
  const item = result[0];
  return item;
}
