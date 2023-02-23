import { hash } from "../utils/nodeUtils";
import { typeorm } from "../models/database";
import Login from "../models/entities/Login";
import { User } from "../models/types";
import {
  validateEmail,
  validatePassword,
  validateSignupEmailAvailable,
  validateToken,
  validateUser,
} from "./validateUtils";
import dbToken from "./dbToken";
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
  validateEmail(email);
  validatePassword(password);
  validateUser(user, "ERROR: user is required");
  validateSignupEmailAvailable(email);

  await typeorm.initialized();
  const emailHash = hash(email);
  const passwordHash = hash(password);
  const emailAndPassword = { emailHash, passwordHash, user };
  const logins = typeorm.getRepository(Login);
  await logins.insert(emailAndPassword);
}
async function deleteLoginByEmail(email: string) {
  validateEmail(email);

  const emailHash = hash(email);
  const columnsMatchValues = { emailHash };
  const data = await typeorm.getRepository(Login).delete(columnsMatchValues);
  return data;
}

async function getUserIdByPassword(email: string, password: string) {
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
  const userId = data?.user?.id;
  return userId;
}

async function loginWithPassword(email: string, password: string) {
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
  let token = data?.token;
  if (!token) {
    token = dbToken.getNew(email);
    await dbToken.save(email, token);
  }
  const user = data?.user as User;
  if (!user) throw new Error("ERROR: invalid login");
  user.token = token;
  return { user, token };
}

async function loginWithToken(email: string, token: string) {
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
}
