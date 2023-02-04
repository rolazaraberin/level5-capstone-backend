import { generateKey, quoteValues } from "../utils/utilityFunctions";
import { hash } from "../utils/nodeUtils";
import { knex } from "../models/database";

const dbToken = {
  invalidate,
  getNew,
  save,
};
export default dbToken;

async function invalidate(email: string) {
  const emailHash = hash(email);
  const table = "login";
  // const columns = ["token"];
  // const values = quoteValues([""]);
  // const target = ["emailHash"];
  // const match = quoteValues([emailHash]);
  // const data = await db.sql(sql);
  const columnsToValues = { token: "" };
  const columnsMatchValues = { emailHash };
  const data = await knex
    .table(table)
    .update(columnsToValues)
    .where(columnsMatchValues);
  // const userID = isEmpty(data) ? null : data[0].userID;
  const { affectedRows } = data as any;
  if (affectedRows || data) return affectedRows || data;
  else throw new Error("ERROR: Invalid account");
}

function getNew(email: string) {
  // const emailHash = hash(email);
  // const passwordHash = hash(password);
  // const table = "login";
  // const columns = ["emailHash", "passwordHash"];
  // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
  // const data = await db.sql(sql);
  // const userID = isEmpty(data) ? null : data[0].userID;
  const token = hash(email + generateKey());
  return token;
}

async function save(email: string, token: string) {
  const emailHash = hash(email);
  const table = "login";
  const columns = ["token"];
  const values = quoteValues([token]);
  const target = "emailHash";
  const match = quoteValues([emailHash]);
  const columnsToValues = { token };
  const columnsMatchValues = { emailHash };
  const sql = `UPDATE ${table} SET ${columns} = ${values} WHERE ${target} = ${match}`;
  const result = await knex
    .table(table)
    .update(columnsToValues)
    .where(columnsMatchValues);
  // const result = await db.sql(sql);
  return result;
}
