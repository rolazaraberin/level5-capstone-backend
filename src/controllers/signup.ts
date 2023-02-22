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
import { createAccountByPassword } from "./accountUtils";
import { getCartByUser } from "./cartUtils";
import { handleAsyncError } from "../utils/errorUtils";

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
    const { user } = await createAccountByPassword(email, password);
    const cart = await getCartByUser(user);
    response.status(200).send({ user, cart });

    if (disableEmails !== "true") sendEmail.signupConfirmation(email);
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    response.status(code).send(message);
  }
}

async function validate(email: string) {
  const emailHash = hash(email);
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
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const login = new Login();
  login.emailHash = emailHash;
  login.passwordHash = passwordHash;
  login.user = user;
  return login;
}

function createAccount(email: string) {
  const user = new User();
  user.email = email;
  return user;
}
