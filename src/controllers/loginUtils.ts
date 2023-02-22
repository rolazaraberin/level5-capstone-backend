import { hash } from "../utils/nodeUtils";
import { typeorm } from "../models/database";
import Login from "../models/entities/Login";
import { isSignupEmailAvailable } from "./signupUtils";
import { User } from "../models/types";
import {
  validateEmail,
  validatePassword,
  validateToken,
} from "./validateUtils";
export {
  createLoginByPassword,
  getUserIdByPassword,
  deleteLoginByEmail,
  loginWithPassword,
  loginWithToken,
};

async function createLoginByPassword(
  email: string,
  password: string,
  user: User
) {
  // if (!email) throw new Error("ERROR: email required");
  // if (!password) throw new Error("ERROR: password required");

  validateEmail(email);
  validatePassword(password);
  if (!user) throw new Error("ERROR: user is required");

  if (!isSignupEmailAvailable(email))
    throw new Error("ERROR: email is not available");

  await typeorm.initialized();
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const emailAndPassword = { emailHash, passwordHash, user };
  const logins = typeorm.getRepository(Login);
  await logins.insert(emailAndPassword);
}
async function deleteLoginByEmail(email: string) {
  // if (!email) throw new Error("ERROR: email must be provided");

  validateEmail(email);

  const emailHash = hash(email);
  const columnsMatchValues = { emailHash };
  const data = await typeorm.getRepository(Login).delete(columnsMatchValues);
  return data;
}

async function getUserIdByPassword(email: string, password: string) {
  // if (!email) throw new Error("ERROR: email required");
  // if (!password) throw new Error("ERROR: password required");

  validateEmail(email);
  validatePassword(password);

  await typeorm.initialized();
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const passwordMatches = { emailHash, passwordHash };
  const logins = typeorm.getRepository(Login);

  const data = await logins.findOne({
    where: passwordMatches,
    relations: { user: true },
  });
  // const data = await logins.findOneBy(emailAndPassword);
  const userId = data?.user?.id;
  return userId;
}

async function loginWithPassword(email: string, password: string) {
  // if (!email) throw new Error("ERROR: email is required");
  // if (!password) throw new Error("ERROR: password is required");
  // if (typeof email !== "string") throw new Error("ERROR: invalid email");
  // if (typeof password !== "string") throw new Error("ERROR: invalid password");

  validateEmail(email);
  validatePassword(password);

  await typeorm.initialized();
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const columnsMatchValues = { emailHash, passwordHash };
  const logins = typeorm.getRepository(Login);
  const data = await logins.findOne({
    where: columnsMatchValues,
    relations: { user: true },
  });
  const token = data?.token;
  const user = data?.user as User;
  user.token = token;
  if (!user) throw new Error("ERROR: invalid login");
  return { user, token };
  // const userID = data?.user?.id;
  // if (!userID) {
  //   const error = new Error("ERROR: Invalid email or token") as any;
  //   error.code = httpCodes.error.unauthenticated;
  //   throw error;
  // }
  // return userID;
}

async function loginWithToken(email: string, token: string) {
  // if (!email) throw new Error("ERROR: email is required");
  // if (!token) throw new Error("ERROR: token is required");
  // if (typeof email !== "string") throw new Error("ERROR: invalid email");
  // if (typeof token !== "string") throw new Error("ERROR: invalid token");

  validateEmail(email);
  validateToken(token);

  const emailHash = hash(email);
  const columnsMatchValues = { emailHash, token };
  const logins = typeorm.getRepository(Login);
  const data = await logins.findOne({
    where: columnsMatchValues,
    relations: { user: true },
  });
  const user = data?.user;
  if (!user) throw new Error("ERROR: invalid login");
  return user;
  // const userID = data?.user?.id;
  // if (!userID) {
  //   const error = new Error("ERROR: Invalid email or token") as any;
  //   error.code = httpCodes.error.unauthenticated;
  //   throw error;
  // }
  // return userID;
}
