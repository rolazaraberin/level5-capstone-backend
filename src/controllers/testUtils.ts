import { User } from "../models/types";
import {
  createAccountByPassword,
  deleteAccountByPassword,
} from "./accountUtils";
import { deleteCartById } from "./cartUtils";
import { deleteLoginByEmail, loginWithPassword } from "./loginUtils";
import { deleteUserById } from "./userUtils";

export {
  getValidCredentials,
  getValidTemporaryCredentials,
  getUnusedCredentials,
  getUnusedTemporaryCredentials,
  removeUserForeignKeyConstraints,
  removeLoginRelationalTables,
};

async function getValidCredentials() {
  const email = "correct@email.com";
  const password = "correct password";
  let data: any;

  try {
    data = await loginWithPassword(email, password);
  } catch (accountDoesNotExist) {
    data = await createAccountByPassword(email, password);
  }

  const token = data.token;
  const user = data.user;
  const userId = user.id;
  const cartID = user.cartID;
  return { email, password, cartID, token, user, userId };
}

async function getUnusedCredentials() {
  const email = "new@email.com";
  const password = "new password";

  try {
    let result: any = await loginWithPassword(email, password);
    result = await deleteAccountByPassword(email, password);
  } catch (credentialsAvailable) {
    //DO NOTHING
  }

  return { email, password };
}

async function getUnusedTemporaryCredentials() {
  const email = "temporary@email.com";
  const password = "temporary";

  try {
    let result: any = await loginWithPassword(email, password);
    result = await deleteAccountByPassword(email, password);
  } catch (credentialsAvailable) {
    //DO NOTHING
  }

  return { email, password };
}

async function getValidTemporaryCredentials() {
  const email = "temporary@email.com";
  const password = "temporary";
  let data: any;
  try {
    data = await loginWithPassword(email, password);
  } catch (accountDoesNotExist) {
    data = await createAccountByPassword(email, password);
  }

  const user = data.user;
  const userId = user?.id;
  const cartID = user?.cartID;
  const token = data.token;

  return { email, password, cartID, userId, user };
}

async function removeUserForeignKeyConstraints(user: User) {
  await deleteCartById(user.cartID);
  await deleteLoginByEmail(user.email);
}

async function removeLoginRelationalTables(user: User) {
  await deleteCartById(user.cartID);
  await deleteUserById(user.id);
}
