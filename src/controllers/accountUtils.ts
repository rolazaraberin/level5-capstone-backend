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
  deleteAccountByPassword,
  deleteAccountById,
  getAccountByToken,
  getAccountById,
};

async function createAccountByPassword(email: string, password: string) {
  const user: User = await createUserByEmail(email);
  await createLoginByPassword(email, password, user);
  const token = dbToken.getNew(email);
  await dbToken.save(email, token);
  user.token = token;
  return { user, token };
}

async function deleteAccount(cartId: number, email: string, userId: number) {
  await deleteCartById(cartId);
  await deleteLoginByEmail(email);
  await deleteUserById(userId);
}

async function deleteAccountById(userId: number) {
  const user = await getUserById(userId);
  if (!user) {
    const error: any = new Error("ERROR: invalid user id");
    error.code = httpCodes.error.badRequest;
    throw error;
  }
  await deleteAccount(user.cartID, user.email, userId);
}

async function deleteAccountByPassword(email: string, password: string) {
  const user = await getUserByPassword(email, password);
  if (!user) {
    const error: any = new Error("ERROR: incorrect password");
    error.code = httpCodes.error.incorrectPassword;
    throw error;
  }
  await deleteAccount(user.cartID, email, user.id);
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
