import { loginWithPassword } from "./loginUtils";
import {
  createUserByEmail,
  deleteUserById,
  getUserById,
  getUserByPassword,
  getUserByToken,
} from "./userUtils";

jest.setTimeout(25000);

describe("deleteUserById", () => {
  test("Given an id, it deletes a user", async () => {
    const user = await createUser();
    await deleteUserById(user.id);
    const result = await getUserById(user.id);
    expect(result).not.toBeDefined();
  });
});

describe("createUserByEmail", () => {
  test("Given an email, it creates a user", async () => {
    const email = "temp@email.com";
    const user = await createUserByEmail(email);
    const result = await getUserById(user.id);
    await deleteUserById(user.id);
    expect(result.email).toBe(email);
  });
});

describe("getUserByPassword", () => {
  test("Given correct email and password, it returns a user", async () => {
    const email = "correct@email.com";
    const password = "correct password";
    const user = await getUserByPassword(email, password);
    expect(user.email).toBe(email);
  });
  test("Given wrong email and password, it returns nothing", async () => {
    const email = "wrong@email.com";
    const password = "wrong password";
    const user = await getUserByPassword(email, password);
    expect(user).toBeFalsy();
  });
});

describe("getUserByToken", () => {
  test("Given correct email and token, it returns a user", async () => {
    const { email, token } = await login();
    const result = await getUserByToken(email, token);
    expect(result.email).toBe(email);
  });
  test("Given no email, it throws an error", async () => {
    let noEmail: any, result: any;
    const token =
      "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";

    noEmail = "";
    result = getUserByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = undefined;
    result = getUserByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = null;
    result = getUserByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = {};
    result = getUserByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = [];
    result = getUserByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();
  });
});

describe("getUserById", () => {
  test("Given a valid id, it returns a user", async () => {
    const id = 2;
    const user = await getUserById(id);
    const userId = Number(user.id);
    expect(userId).toBe(id);
  });
  test("Given invalid id, it returns nothing", async () => {
    const id = -1;
    const user = await getUserById(id);
    expect(user).toBeFalsy();
  });
});

//UTILS//////////////////////////////////////////

async function createUser() {
  const email = "temporary@email.com";
  const user = await createUserByEmail(email);
  return user;
}

async function login() {
  const email = "correct@email.com";
  const password = "correct password";
  const result = await loginWithPassword(email, password);
  const user = result.user;
  const token = result.token;
  return { email, password, token, user };
}
