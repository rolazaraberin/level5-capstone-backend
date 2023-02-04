import { NextFunction, Request, Response } from "express";
// import db from "../models/database";
import { hash } from "../utils/nodeUtils";
import { isEmpty, quoteValues } from "../utils/utilityFunctions";
import { generateKey } from "../utils/utilityFunctions";
import { AuthData } from "../models/types";
import authenticate from "./authenticate";
import dbToken from "./dbToken";
import httpCodes from "../utils/httpCodes";
import { handleAsyncError } from "../routes/router";

const login = { withToken, withPassword };
export default login;

async function withToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, token } = request.body;
  if (!token) return next();
  try {
    // const userID = await authenticateToken(email, token);
    const userID = await authenticate.token(email, token);
    if (!userID)
      return response.status(401).send("ERROR: Incorrect email or password");
    // debugger; //TODO: TRANSFER USER INFO TO ACCOUNT CONTROLLER
    // const account = await getUserInfo(userID);
    // if (!account)
    //   return response.status(401).send("ERROR: Cannot retrieve account");
    const authInfo: AuthData = { email, token, isTemporary: false };
    response.status(200).send(authInfo);
    // account.token = token;
    // response.status(200).send(account);
  } catch (asyncError) {
    const { code, message } = await handleAsyncError(asyncError);
    // const error = await asyncError;
    // const message = error.message;
    // const code = error.code;
    response.status(code).send(message);
  }
}

async function withPassword(request: Request, response: Response) {
  const { email, password } = request.body;
  try {
    const { userID, token } = await authenticate.password(email, password);
    // const { userID, token } = await authenticatePassword(email, password);
    // const { userID, token } = await authenticate(request.body);
    if (!userID)
      return response.status(401).send("ERROR: Incorrect email or password");
    // debugger; //TODO: TRANSFER USER INFO TO ACCOUNT CONTROLLER
    // const account = await getUserInfo(userID);
    // if (!account)
    //   return response.status(401).send("ERROR: Cannot retrieve account");
    const authInfo: AuthData = { email, token, isTemporary: false };
    if (!token) {
      authInfo.token = dbToken.getNew(email);
      // authInfo.token = await authenticate.getNewToken(email);
      await dbToken.save(email, authInfo.token);
      // await authenticate.saveToken(email, authInfo.token);
    }
    response.status(200).send(authInfo);
    // if (token) account.token = token;
    // else {
    //   account.token = await getNewToken(email);
    //   await saveToken(email, account.token);
    // }
    // response.status(200).send(account);
  } catch (asyncError) {
    const error = await asyncError;
    const message = error.message;
    let code = error.code || httpCodes.error.general;
    if (code >= 600 || typeof code === "string")
      code = httpCodes.error.serverError;
    response.status(code).send(message);
  }
}

// async function authenticatePassword(email: string, password: string) {
//   // try {
//   // const { emailHash, passwordHash } = requestBody;
//   // const { email, password } = requestBody;
//   if (!email || !password) {
//     const error = new Error(
//       "ERROR: email and password must be provided"
//     ) as Error & { code: number };
//     error.code = 400;
//     throw error;
//   }
//   const emailHash = hash(email);
//   const passwordHash = hash(password);
//   const table = "login";
//   const columns = ["emailHash", "passwordHash"];
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
//   const data = await db.sql(sql);
//   const userID = isEmpty(data) ? null : data[0].userID;
//   const token = isEmpty(data) ? null : data[0].token;
//   return { userID, token };
//   // } catch (mismatchingEmailAndPassword) {
//   // return null;
//   // }
// }

// async function authenticateToken(email: string, token: string) {
//   if (!email || !token) {
//     const error = new Error(
//       "ERROR: email and password must be provided"
//     ) as Error & { code: number };
//     error.code = 400;
//     throw error;
//   }
//   const emailHash = hash(email);
//   const table = "login";
//   const columns = ["emailHash", "token"];
//   const values = quoteValues([emailHash, token]);
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = ${values[0]} AND ${columns[1]} = ${values[1]}`;
//   const data = await db.sql(sql);
//   const userID = isEmpty(data) ? null : data[0].userID;
//   return userID;
// }

// async function getUserInfo(userID: number) {
//   const table = "user";
//   const columns = ["id"];
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${userID}'`;
//   const data = await db.sql(sql);
//   const account = data[0];
//   return account;
// }

// async function getNewToken(email: string) {
//   // const emailHash = hash(email);
//   // const passwordHash = hash(password);
//   // const table = "login";
//   // const columns = ["emailHash", "passwordHash"];
//   // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
//   // const data = await db.sql(sql);
//   // const userID = isEmpty(data) ? null : data[0].userID;
//   const token = hash(email + generateKey());
//   return token;
// }

// async function saveToken(email: string, token: string) {
//   const emailHash = hash(email);
//   const table = "login";
//   const columns = ["token"];
//   const values = quoteValues([token]);
//   const target = "emailHash";
//   const match = quoteValues([emailHash]);
//   const sql = `UPDATE ${table} SET ${columns} = ${values} WHERE ${target} = ${match}`;
//   const result = await db.sql(sql);
//   return result;
// }
