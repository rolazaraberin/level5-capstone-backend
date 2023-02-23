import { hash } from "../utils/nodeUtils";
import { sql, typeorm } from "../models/database";
import Login from "../models/entities/Login";
import User from "../models/entities/User";
import { User as UserWithToken } from "../models/types";
import { getUserIdByPassword } from "./loginUtils";
import { createCart } from "./cartUtils";
import {
  validateEmail,
  validatePassword,
  validateToken,
  validateUser,
} from "./validateUtils";
import httpCodes, { HttpError } from "../utils/httpCodes";

export {
  createUserByEmail,
  getCartId,
  getUserById,
  getUserByToken,
  getUserByPassword,
  deleteUserById,
};

async function getCartId(user: UserWithToken) {
  const { email, token, cartID } = user;
  if (cartID) return cartID;
  const userInfo = await getUserByToken(email, token);
  return userInfo?.cartID;
}

async function getUserById(userID: number) {
  try {
    if (!userID) throw new Error("ERROR: user id is required");
    let table = "public.user";
    let primaryKey = "id";
    const itemsColumn = "itemsTable";
    let command = `SELECT * FROM ${table} WHERE ${primaryKey} = ${userID}`;
    const columnsMatchValues = { id: userID };
    let data = await sql(command);
    const user = data[0];
    return user as User;
  } catch (error) {
    debugger;
  }
}

async function getUserByToken(email: string, token: string) {
  validateEmail(email);
  validateToken(token);

  const emailHash = hash(email);
  const columnsMatchValues = { emailHash, token };
  await typeorm.initialized();
  const logins = typeorm.getRepository(Login);

  const data = await logins.findOne({
    where: columnsMatchValues,
    relations: { user: true },
  });
  const user: UserWithToken = data?.user;
  validateUser(user);
  user.token = token;
  return user;
}

async function getUserByPassword(email: string, password: string) {
  validateEmail(email);
  validatePassword(password);

  const userId = await getUserIdByPassword(email, password);
  if (!userId) {
    const error = new Error("ERROR: invalid email or password") as HttpError;
    error.code = httpCodes.error.incorrectCredentials;
    throw error;
  }
  const user = await getUserById(userId);
  return user;
}

async function deleteUserById(id: number) {
  try {
    if (!id) throw new Error("ERROR: user id is required");
    const results = await typeorm.getRepository(User).delete(id);
    return results;
  } catch (foreignKeyConstraint) {
    throw new Error(
      "ERROR: must delete user cart and user login before deleting user"
    );
  }
}

async function createUserByEmail(email: string) {
  validateEmail(email);

  await typeorm.initialized();
  const users = typeorm.getRepository(User);
  const user = new User();
  user.email = email;
  user.cartID = await createCart();
  const result = await users.insert(user);
  const userId = Number(result.raw[0].id);
  user.id = userId;
  return user;
}
