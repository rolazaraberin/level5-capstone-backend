import { createCart, deleteCartById, getCartById } from "./cartUtils";
import { createLoginByPassword, deleteLoginByEmail } from "./loginUtils";
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
  const user = await createUserByEmail(email);
  await createLoginByPassword(email, password, user);
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
  await deleteCartById(user.cartID);
  await deleteLoginByEmail(email);
  await deleteUserById(user.id);
}
