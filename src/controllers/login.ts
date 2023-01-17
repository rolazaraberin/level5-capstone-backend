import { NextFunction, Request, Response } from "express";
import db from "../models/database";
import { hash } from "../utils/nodeUtils";
import { isEmpty } from "../utils/utilityFunctions";

const login = { withToken, withPassword };

export default login;

async function withToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  debugger;
  const { email, token } = request.body;
  if (!token) return next();
  debugger;
}

async function withPassword(request: Request, response: Response) {
  // const { email, password } = request.body;
  debugger;
  try {
    const userID = await authenticate(request.body);
    if (!userID)
      return response.status(401).send("ERROR: Incorrect email or password");
    const account = await getUserInfo(userID);
    if (!account)
      return response.status(401).send("ERROR: Cannot retrieve account");
    response.status(200).send(account);
  } catch (_error) {
    const error = await _error;
    const message = error.message;
    const code = error.code;
    response.status(code).send(message);
  }
}

async function authenticate(requestBody: any) {
  // try {
  // const { emailHash, passwordHash } = requestBody;
  const { email, password } = requestBody;
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
  return userID;
  // } catch (mismatchingEmailAndPassword) {
  // return null;
  // }
}

async function getUserInfo(userID: number) {
  const table = "user";
  const columns = ["id"];
  const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${userID}'`;
  const data = await db.sql(sql);
  const account = data[0];
  return account;
}
