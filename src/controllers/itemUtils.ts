import { isEmpty } from "../utils/utilityFunctions";
import { sql } from "../models/database";

export { getItemById };

async function getItemById(id: number) {
  if (isEmpty(id)) throw new Error("ERROR: item id is required");
  if (typeof id !== "number") throw new Error("ERROR: invalid item id");

  await sql.initialized();
  const table = "item";
  const primaryKey = "id";
  const value = Number(id);
  const command = `SELECT * FROM ${table} WHERE ${primaryKey} = ${value}`;
  const result = await sql(command);
  const item = result[0];
  return item;
}
