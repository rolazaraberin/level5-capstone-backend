import { Request, Response } from "express";
import { hash } from "../utils/nodeUtils";
import { quoteValues } from "../utils/utilityFunctions";
import { sql as runRaw, typeorm, knex } from "../models/database";
import authenticate from "./authenticate";
import httpCodes from "../utils/httpCodes";
import sendEmail from "./sendEmail";
import User from "../models/entities/User";
import Login from "../models/entities/Login";
import dotenv from "dotenv";
import { getCartById } from "./cartUtils";
import { getUserById } from "./userUtils";
import {
  deleteAccountByPassword,
  getAccountById,
  getAccountByToken,
} from "./accountUtils";

const account = { fetchInfo, delete: _delete };
export default account;

dotenv.config();
const disableEmails = process.env.disableEmails;

async function fetchInfo(request: Request, response: Response) {
  try {
    const { email, token } = request.body;
    const account = await getAccountByToken(email, token);
    // const userID = await authenticate.token(email, token);
    // const account = await getAccountById(userID);
    // const account = await getAccountInfo(userID);
    if (!account)
      return response.status(401).send("ERROR: Cannot retrieve account");
    response.status(200).send(account);
  } catch (asyncError) {
    handleAsyncError(asyncError, response);
    // const error = await asyncError;
    // debugger;
    // const message = error.message;
    // const code = error.code;
    // response.status(code).send(message);
  }
}

// async function getAccountInfo(userID: number) {
//   try {
//     const account: any = await getUserById(userID);
//     account.cart = await getCartById(account.cartID);
//     return account;
//   } catch (error) {
//     debugger;
//   }
// }

async function _delete(request: Request, response: Response) {
  try {
    const { email, password } = request.body;
    await deleteAccountByPassword(email, password);
    // const { userID } = await authenticate.password(email, password);
    // const user = await getUserById(userID);
    // await deleteCart(user.cartID);
    // await deleteLogin(email);
    // await deleteUser(user.id);
    response.status(200).send("SUCCESS: Account deleted");
    if (disableEmails !== "true") sendEmail.deleteConfirmation(email);
  } catch (asyncError) {
    const error = await asyncError;
    let message = error.message;
    let code = error.code || httpCodes.error.general;
    if (code === httpCodes.error.unauthenticated)
      message = "ERROR: Incorrect password";
    response.status(code).send(message);
  }
}

// async function deleteUser(userID: string | number) {
//   // const table = "user";
//   // const columns = ["id"];
//   // const values = quoteValues([userID]);
//   // const sql = `DELETE FROM ${table} WHERE ${columns} = ${values}`;
//   // const data = await runRaw(sql);
//   const data = await typeorm.getRepository(User).delete(userID);
//   return data;
// }
// async function deleteLogin(email: string) {
//   const emailHash = hash(email);
//   // const table = "login";
//   // const columns = ["emailHash"];
//   // const values = quoteValues([emailHash]);
//   // const sql = `DELETE FROM ${table} WHERE ${columns} = ${values}`;
//   // const data = await runRaw(sql);
//   const columnsMatchValues = { emailHash };
//   const data = await typeorm.getRepository(Login).delete(columnsMatchValues);
//   return data;
// }
// async function deleteCart(cartID: number) {
//   debugger;
//   const cart = await getCartById(cartID);
//   let table = cart.itemsTable;
//   knex.schema.dropTable(table);

//   table = "cart";
//   const cartIdMatches = { id: cart.id };
//   knex.table(table).delete().where(cartIdMatches);
// }
async function handleAsyncError(asyncError: any, response: Response) {
  const error = await asyncError;
  const message = error.message;
  const code = error.code || httpCodes.error.general;
  response.status(code).send(message);
}
