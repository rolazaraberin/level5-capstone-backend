import db from "../models/database";
import { hash } from "../utils/nodeUtils";
import { isEmpty, quoteValues } from "../utils/utilityFunctions";

const authenticate = { password, token, invalidateToken };
export default authenticate;

async function password(email: string, password: string) {
  // try {
  // const { emailHash, passwordHash } = requestBody;
  // const { email, password } = requestBody;
  if (!email || !password) {
    const error = new Error(
      "ERROR: email and password must be provided"
    ) as Error & { code: number };
    error.code = 400;
    throw error;
  }
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const table = "login";
  const columns = ["emailHash", "passwordHash"];
  const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
  const data = await db.sql(sql);
  const userID = isEmpty(data) ? null : data[0].userID;
  const token = isEmpty(data) ? null : data[0].token;
  return { userID, token };
  // } catch (mismatchingEmailAndPassword) {
  // return null;
  // }
}

async function token(email: string, token: string) {
  if (!email || !token) {
    const error = new Error(
      "ERROR: email and password must be provided"
    ) as Error & { code: number };
    error.code = 400;
    throw error;
  }
  const emailHash = hash(email);
  const table = "login";
  const columns = ["emailHash", "token"];
  const values = quoteValues([emailHash, token]);
  const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = ${values[0]} AND ${columns[1]} = ${values[1]}`;
  const data = await db.sql(sql);
  const userID = isEmpty(data) ? null : data[0].userID;
  return userID;
}

async function invalidateToken(email: string) {
  const emailHash = hash(email);
  const table = "login";
  const columns = ["token"];
  const values = quoteValues([""]);
  const target = ["emailHash"];
  const match = quoteValues([emailHash]);
  const sql = `UPDATE ${table} SET ${columns} = ${values} WHERE ${target} = ${match}`;
  const data = await db.sql(sql);
  // const userID = isEmpty(data) ? null : data[0].userID;
  const { affectedRows } = data;
  if (affectedRows) return affectedRows;
  else throw new Error("ERROR: Invalid account");
}
