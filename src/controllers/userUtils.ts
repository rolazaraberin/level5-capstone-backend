import { hash } from "../utils/nodeUtils";
import { sql, typeorm } from "../models/database";
import authenticate from "./authenticate";
// import { User } from "../models/types";
import Login from "../models/entities/Login";
import { handleAsyncError } from "../routes/router";
import User from "../models/entities/User";

export { getUserById, getUserByToken, getUserByPassword, deleteUserById };

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
  if (!email) throw new Error("ERROR: email must be provided");
  if (!token) throw new Error("ERROR: token must be provided");
  const emailHash = hash(email);
  const columnsMatchValues = { emailHash, token };
  try {
    await typeorm.initialize();
    const logins = typeorm.getRepository(Login);
    // const data = await typeorm
    // .getRepository(Login)

    const data = await logins.findOne({
      where: columnsMatchValues,
      relations: { user: true },
    });
    const user = data.user;
    return user;
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    debugger;
  }
}

async function getUserByPassword(email: string, password: string) {
  if (!email) throw new Error("ERROR: email must be provided");
  if (!password) throw new Error("ERROR: password must be provided");
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const columnsMatchValues = { emailHash, passwordHash };
  try {
    await typeorm.initialize();
    const logins = typeorm.getRepository(Login);
    // const data = await typeorm
    // .getRepository(Login)

    const data = await logins.findOne({
      where: columnsMatchValues,
      relations: { user: true },
    });
    const user = data.user;
    return user;
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    debugger;
  }
}

async function deleteUserById(id: number) {
  if (!id) throw new Error("ERROR: user id is required");
  const data = await typeorm.getRepository(User).delete(id);
  return data;
}
