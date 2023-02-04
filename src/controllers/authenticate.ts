import httpCodes from "../utils/httpCodes";
import { typeorm, knex } from "../models/database";
import { hash } from "../utils/nodeUtils";
import { isEmpty, quoteValues, generateKey } from "../utils/utilityFunctions";
import Login from "../models/entities/Login";
import User from "../models/entities/User";

const authenticate = {
  password,
  token,
  email,
  itemsTable,
  // invalidateToken,
  // getNewToken,
  // saveToken,
};
export default authenticate;

async function password(email: string, password: string) {
  // try {
  // const { emailHash, passwordHash } = requestBody;
  // const { email, password } = requestBody;
  if (!email || !password) {
    const error: any = new Error("ERROR: email and password must be provided");
    error.code = httpCodes.error.unauthenticated;
    throw error;
  }
  const emailHash = hash(email);
  const passwordHash = hash(password);
  // const table = "login";
  // const Table = Login;
  // const Property = User;
  // const columns = ["emailHash", "passwordHash"];
  // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
  // const data = await db.sql(sql);
  const columnsMatchValues = { emailHash, passwordHash };
  // const data = await db.knex.table(table).select().where(columnsMatchValues);
  const data = await typeorm.manager
    .getRepository(Login)
    .findOne({ where: columnsMatchValues, relations: { user: true } });
  // const data = await db.typeorm
  //   .select()
  //   .from(Table, "login")
  //   .leftJoinAndSelect(Property, "user")
  //   .where(columnsMatchValues)
  //   .getOne();
  const userID = data.user.id;
  const token = data.token;
  // const userID = isEmpty(data) ? null : data[0].userID;
  // const token = isEmpty(data) ? null : data[0].token;
  if (userID === null) {
    const error: any = new Error("ERROR: Incorrect email or password");
    error.code = httpCodes.error.unauthenticated;
    throw error;
  }
  return { userID, token };
  // } catch (mismatchingEmailAndPassword) {
  // return null;
  // }
}

async function token(email: string, token: string) {
  if (isEmpty(email) || isEmpty(token)) {
    const error: any = new Error("ERROR: email and password must be provided");
    error.code = httpCodes.error.unauthenticated;
    throw error;
  }

  const emailHash = hash(email);
  if (!emailHash) {
    const error: any = new Error("ERROR: Invalid email or token");
    error.code = httpCodes.error.unauthenticated;
    throw error;
  }
  // const table = "login";
  // const columns = ["emailHash", "token"];
  // const values = quoteValues([emailHash, token]);
  // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = ${values[0]} AND ${columns[1]} = ${values[1]}`;
  // const data = await db.sql(sql);
  const columnsMatchValues = { emailHash, token };
  // const data = await knex.table(table).select().where(columnsMatchValues);
  const data = await typeorm.manager
    .getRepository(Login)
    .findOne({ where: columnsMatchValues, relations: { user: true } });
  // const userID = isEmpty(data) ? null : data[0].userID;
  const userID = data?.user?.id;
  if (!userID) {
    const error = new Error("ERROR: Invalid email or token") as any;
    error.code = httpCodes.error.unauthenticated;
    throw error;
  }
  return userID;
}

async function email(email: string) {
  const hashedEmail = hash(email);
  const authenticateEmailHash = emailHash;
  await authenticateEmailHash(hashedEmail);
  // const columnsMatchValues = { emailHash };
  // const data = await typeorm.manager
  //   .getRepository(Login)
  //   .findOne({ where: columnsMatchValues });
  // if (isEmpty(data)) {
  //   const error: any = new Error("ERROR: Account does not exist");
  //   error.code = httpCodes.error.unauthenticated;
  //   throw error;
  // } else return "Email validated";
}

async function emailHash(emailHash: string) {
  const columnsMatchValues = { emailHash };
  const data = await typeorm.manager
    .getRepository(Login)
    .findOne({ where: columnsMatchValues });
  if (isEmpty(data)) {
    const error: any = new Error("ERROR: Account does not exist");
    error.code = httpCodes.error.unauthenticated;
    throw error;
  } else return "Email validated";
}

async function itemsTable(tableId: string) {
  const hashedEmail = tableId;
  const authenticateEmailHash = emailHash;
  await authenticateEmailHash(hashedEmail);
}
