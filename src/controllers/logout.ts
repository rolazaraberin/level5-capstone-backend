import { Request, Response } from "express";
// import db from "../models/database";
import { isEmpty, quoteValues } from "../utils/utilityFunctions";
import { hash } from "../utils/nodeUtils";
import authenticate from "./authenticate";
import dbToken from "./dbToken";
import httpCodes from "../utils/httpCodes";
import { handleAsyncError } from "../routes/router";

const logout = { withToken };
export default logout;

async function withToken(request: Request, response: Response) {
  try {
    const { email, token } = request.body;
    await authenticate.token(email, token);
    // await authenticateToken(email, token);
    await dbToken.invalidate(email);
    // await authenticate.invalidateToken(email);
    // await invalidateToken(email);
    response.status(200).send("SUCCESS: logged out");
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    // const error = await asyncError;
    // const message = error.message;
    // response.status(httpCodes.error.unauthenticated).send(message);
    response.status(code).send(message);
  }
}

// async function authenticateToken(email: string, token: string) {
//   const emailHash = hash(email);
//   const table = "login";
//   const columns = ["emailHash", "token"];
//   const values = quoteValues([emailHash, token]);
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = ${values[0]} AND ${columns[1]} = ${values[1]}`;
//   const data = await db.sql(sql);
//   const userID = isEmpty(data) ? null : data[0].userID;
//   if (userID) return userID;
//   else throw new Error("ERROR: Invalid account");
// }

// async function invalidateToken(email: string) {
//   const emailHash = hash(email);
//   const table = "login";
//   const columns = ["token"];
//   const values = quoteValues([""]);
//   const target = ["emailHash"];
//   const match = quoteValues([emailHash]);
//   const sql = `UPDATE ${table} SET ${columns} = ${values} WHERE ${target} = ${match}`;
//   const data = await db.sql(sql);
//   // const userID = isEmpty(data) ? null : data[0].userID;
//   const { affectedRows } = data;
//   if (affectedRows) return affectedRows;
//   else throw new Error("ERROR: Invalid account");
// }
