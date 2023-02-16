import { deleteCartById, getCartById } from "./cartUtils";
import { deleteLoginByEmail } from "./loginUtils";
import {
  deleteUserById,
  getUserById,
  getUserByPassword,
  getUserByToken,
} from "./userUtils";

export { getAccountByToken, getAccountById, deleteAccountByPassword };

async function getAccountByToken(email: string, token: string) {
  const user = await getUserByToken(email, token);
  const account = await getAccountById(user.id);
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
