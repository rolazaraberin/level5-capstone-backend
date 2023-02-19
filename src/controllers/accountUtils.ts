import { User } from "../models/types";
import { createCart, deleteCartById, getCartById } from "./cartUtils";
import dbToken from "./dbToken";
import { createLoginByPassword, deleteLoginByEmail } from "./loginUtils";
import httpCodes from "../../bak/utils/httpCodes";
import {
  createUserByEmail,
  deleteUserById,
  getUserById,
  getUserByPassword,
  getUserByToken,
} from "./userUtils";

export {
  createAccountByPassword,
  getAccountByToken,
  getAccountById,
  deleteAccountByPassword,
};

async function createAccountByPassword(email: string, password: string) {
  const user: User = await createUserByEmail(email);
  await createLoginByPassword(email, password, user);
  user.token = dbToken.getNew(email);
  await dbToken.save(email, user.token);
  return user;
}
async function getAccountByToken(email: string, token: string) {
  const user = await getUserByToken(email, token);
  const account = await getAccountById(user.id);
  if (account) account.token = token;
  return account;
}

async function getAccountById(userID: number) {
  const account: any = await getUserById(userID);
  account.cart = await getCartById(account.cartID);
  return account;
}

async function deleteAccountByPassword(email: string, password: string) {
  const user = await getUserByPassword(email, password);
  if (!user) {
    const error: any = new Error("ERROR: incorrect password");
    error.code = httpCodes.error.incorrectPassword;
    throw error;
  }
  await deleteCartById(user.cartID);
  await deleteLoginByEmail(email);
  await deleteUserById(user.id);
}
