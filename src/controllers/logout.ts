import { Request, Response } from "express";
import db from "../models/database";
import { isEmpty } from "../utils/utilityFunctions";
import { hash } from "../utils/nodeUtils";

export default logout;

async function logout(request: Request, response: Response) {
  try {
    const { email, token } = request.body;
    const userID = await authenticate(email, token);
    response.status(200).send("SUCCESS: logged out");
  } catch (error) {
    const message = await error;
    debugger;
    response.status(400).send(message);
  }
}

async function authenticate(email: string, token: string) {
  const emailHash = hash(email);
  const table = "login";
  const columns = ["emailHash"];
  const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}'`;
  const data = await db.sql(sql);
  const userID = isEmpty(data) ? null : data[0].userID;
  if (userID) return userID;
  else throw new Error("ERROR: Invalid account");
}
