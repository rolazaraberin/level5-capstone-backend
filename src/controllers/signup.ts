import { Request, Response } from "express";
import db from "../models/database";
import { isEmpty } from "../utils/utilityFunctions";
import { hash } from "../utils/nodeUtils";

export default signup;

async function signup(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    await validate(email);
    const account = await createAccount(email);
    await createLogin(email, password, account.id);
    // const userID = await createLogin(email, password);
    // const userID = await authenticate(request.body);
    // if (userID) return response.status(409).send("ERROR: Account already exists");
    // if (!account)
    //   return response.status(401).send("ERROR: Cannot retrieve account");
    response.status(200).send(account);
  } catch (_error) {
    const error = await _error;
    const message = error.message;
    const code = error.code || 400;
    response.status(code).send(message);
  }
}

async function validate(email: string) {
  const emailHash = hash(email);
  // const passwordHash = hash(password);
  const table = "login";
  const columns = ["emailHash"];
  // const columns = ["emailHash", "passwordHash"];
  let sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}'`;
  let data = await db.sql(sql);
  if (!isEmpty(data)) {
    const error: any = new Error("ERROR: Account already exists");
    error.code = 409;
    throw error;
  } else return "Email validated";
}

async function createLogin(email: string, password: string, userID: number) {
  debugger;
  const table = "login";
  const emailHash = hash(email);
  const passwordHash = hash(password);
  // const columns = ["emailHash", "passwordHash", "userID"];
  // const values = [emailHash, passwordHash, userID].map((value) => `'${value}'`);
  // const sql = `INSERT INTO ${table} ( ${columns} ) VALUES ( ${values} )`;
  const data = await db
    .table(table)
    .insert({ emailHash, passwordHash, userID });
  // const data = await db.sql(sql);
  // const userID = isEmpty(data) ? null : data[0].userID;
  return "Created login";
  // return userID;
  // } catch (mismatchingEmailAndPassword) {
  // return null;
  // }
}

async function createAccount(email: string) {
  const table = "user";
  const columns = ["email"];
  const values = [email];
  let sql = `INSERT INTO ${table} ( ${columns} ) VALUES ( '${values}' )`;
  let data = await db.sql(sql);
  const id = data.insertId;
  sql = `SELECT * FROM ${table} WHERE id = ${id}`;
  data = await db.sql(sql);
  const account = data[0];
  return account;
}
