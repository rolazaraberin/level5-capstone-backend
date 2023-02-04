import { Request, Response, NextFunction } from "express";
import { sql as runRaw, knex, typeorm } from "../models/database";
import { isEmpty } from "../utils/utilityFunctions";
import { hash } from "../utils/nodeUtils";
import sendEmail from "./sendEmail";
import dbToken from "./dbToken";
import { AuthData } from "../models/types";
import Login from "../models/entities/Login";
import User from "../models/entities/User";
import dotenv from "dotenv";

const signup = { withPassword };
export default signup;

dotenv.config();
const disableEmails = process.env.disableEmails;

async function withPassword(
  request: Request,
  response: Response,
  _next: NextFunction
) {
  try {
    const { email, password } = request.body;
    await validate(email);
    await typeorm.transaction(async function (manager) {
      const user = createAccount(email);
      const data = await manager.insert(User, user);
      user.id = data.raw[0].id;
      // const userID = data.raw[0].id;
      const login = await createLogin(email, password, user);
      const token = dbToken.getNew(email);
      login.token = token;
      await manager.insert(Login, login);
      // await dbToken.save(email, token);
      const authInfo: AuthData = { email, token };
      response.status(200).send(authInfo);
    });

    // const userID = await createLogin(email, password);
    // const userID = await authenticate(request.body);
    // if (userID) return response.status(409).send("ERROR: Account already exists");
    // if (!account)
    //   return response.status(401).send("ERROR: Cannot retrieve account");

    if (disableEmails !== "true") sendEmail.signupConfirmation(email);
  } catch (_error) {
    const error = await _error;
    const message = error.message;
    const code = error.code || 400;
    response.status(code).send(message);
  }
}

async function validate(email: string) {
  const emailHash = hash(email);
  // const passwordHash = hash(password);
  // const table = "login";
  // const columns = ["emailHash"];
  // const columns = ["emailHash", "passwordHash"];
  // let sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}'`;
  // let data = await runRaw(sql);
  const columnsMatchValues = { emailHash };
  const data = await typeorm.manager
    .getRepository(Login)
    .findOne({ where: columnsMatchValues });
  if (!isEmpty(data)) {
    const error: any = new Error("ERROR: Account already exists");
    error.code = 409;
    throw error;
  } else return "Email validated";
}

async function createLogin(email: string, password: string, user: User) {
  // const table = "login";
  // const columns = ["emailHash", "passwordHash", "userID"];
  // const values = [emailHash, passwordHash, userID].map((value) => `'${value}'`);
  // const sql = `INSERT INTO ${table} ( ${columns} ) VALUES ( ${values} )`;
  // const data = await knex
  //   .table(table)
  //   .insert({ emailHash, passwordHash, userID });
  // const data = await db.sql(sql);
  // const userID = isEmpty(data) ? null : data[0].userID;
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const login = new Login();
  login.emailHash = emailHash;
  login.passwordHash = passwordHash;
  login.user = user;
  return login;
  // const data = await typeorm.getRepository(Login).insert(login);
  // return "SUCCESS: Created login";
  // return userID;
  // } catch (mismatchingEmailAndPassword) {
  // return null;
  // }
}

function createAccount(email: string) {
  // const table = "user";
  // const columns = ["email"];
  // const values = [email];
  // let sql = `INSERT INTO ${table} ( ${columns} ) VALUES ( '${values}' )`;
  // let data = await runRaw(sql);
  // sql = `SELECT * FROM ${table} WHERE id = ${id}`;
  // data = await runRaw(sql);
  const user = new User();
  user.email = email;
  // const data = await typeorm.getRepository(User).insert(user);
  // const id = data.raw[0].id;
  // const columnsMatchValues = { id };
  // const account = await typeorm
  //   .getRepository(User)
  //   .findOne({ where: columnsMatchValues });
  // return account;
  return user;
}
