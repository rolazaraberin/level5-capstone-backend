import { sql } from "../models/database";

export { getNextAvailableId };

async function getNextAvailableId(table: string, idColumn = "id") {
  await sql.initialized();
  const command = `SELECT MAX(${idColumn}) FROM ${table}`;
  const data = await sql(command);
  const lastId = Number(data[0].max);
  const id = lastId + 1;
  return id;
}
