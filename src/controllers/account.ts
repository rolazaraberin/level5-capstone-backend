import { Request, Response } from "express";
import db from "../models/database";
import authenticate from "./authenticate";

const account = { fetchInfo };
export default account;

async function fetchInfo(request: Request, response: Response) {
  const { email, token } = request.body;
  const userID = await authenticate.token(email, token);
  const account = await getUserInfo(userID);
  if (!account)
    return response.status(401).send("ERROR: Cannot retrieve account");
}

async function getUserInfo(userID: number) {
  const table = "user";
  const columns = ["id"];
  const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${userID}'`;
  const data = await db.sql(sql);
  const account = data[0];
  return account;
}
