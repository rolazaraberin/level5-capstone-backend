import { hash } from "../utils/nodeUtils";
import { sql, typeorm } from "../models/database";
import authenticate from "./authenticate";
// import { User } from "../models/types";
import Login from "../models/entities/Login";
import { handleAsyncError } from "../utils/errorUtils";
import User from "../models/entities/User";
import { User as UserWithToken } from "../models/types";
import { getUserIdByPassword } from "./loginUtils";
import { createCart } from "./cartUtils";
import {
  validateEmail,
  validatePassword,
  validateToken,
} from "./validateUtils";

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
  // if (!email) throw new Error("ERROR: email must be provided");
  // if (!token) throw new Error("ERROR: token must be provided");
  // if (typeof email !== "string") throw new Error("ERROR: invalid email");
  // if (typeof token !== "string") throw new Error("ERROR: invalid token");

  validateEmail(email);
  validateToken(token);

  const emailHash = hash(email);
  const columnsMatchValues = { emailHash, token };
  try {
    await typeorm.initialized();
    const logins = typeorm.getRepository(Login);

    const data = await logins.findOne({
      where: columnsMatchValues,
      relations: { user: true },
    });
    const user = data?.user;
    return user;
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    debugger;
  }
}

async function getUserByPassword(email: string, password: string) {
  // if (!email) throw new Error("ERROR: email must be provided");
  // if (!password) throw new Error("ERROR: password must be provided");

  validateEmail(email);
  validatePassword(password);

  const userId = await getUserIdByPassword(email, password);
  if (userId) {
    const user = await getUserById(userId);
    return user;
  } else return undefined;
}

async function deleteUserById(id: number) {
  if (!id) throw new Error("ERROR: user id is required");
  const results = await typeorm.getRepository(User).delete(id);
  return results;
}

async function createUserByEmail(email: string) {
  // if (!email) throw new Error("ERROR: email is required");
  // if (typeof email !== "string") throw new Error("ERROR: invalid email");

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
