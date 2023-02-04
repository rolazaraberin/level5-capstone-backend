import Login from "../models/entities/Login";
import { hash } from "../utils/nodeUtils";
import { sql as runRaw, typeorm } from "../models/database";
import authenticate from "./authenticate";

export { getUserById, getUserByToken };

async function getUserById(userID: number) {
  try {
    let table = "public.user";
    let idColumn = "id";
    const itemsColumn = "itemsTable";
    let sql = `SELECT * FROM ${table} WHERE ${idColumn} = ${userID}`;
    const columnsMatchValues = { id: userID };
    let data = await runRaw(sql);
    const user = data[0];
    return user;
  } catch (error) {
    debugger;
  }
}

async function getUserByToken(email: string, token: string) {
  if (!email) throw new Error("ERROR: email must be provided");
  if (!token) throw new Error("ERROR: token must be provided");
  const emailHash = hash(email);
  const columnsMatchValues = { emailHash, token };
  const data = await typeorm.manager
    .getRepository(Login)
    .findOne({ where: columnsMatchValues, relations: { user: true } });
  const user = data.user;
  return user;
}
