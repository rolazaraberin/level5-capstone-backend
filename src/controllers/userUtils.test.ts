import {
  getUnusedTemporaryCredentials,
  getValidCredentials,
  getValidTemporaryCredentials,
  removeUserForeignKeyConstraints,
} from "./testUtils";
import {
  createUserByEmail,
  deleteUserById,
  getUserById,
  getUserByPassword,
  getUserByToken,
} from "./userUtils";

jest.setTimeout(250000);

describe("deleteUserById", () => {
  test("Given an id, it deletes a user", async () => {
    const { user, userId } = await getValidTemporaryCredentials();
    await removeUserForeignKeyConstraints(user);
    await deleteUserById(userId);
    const result = await getUserById(userId);
    expect(result).not.toBeDefined();
  });
});

describe("createUserByEmail", () => {
  test("Given an email, it creates a user", async () => {
    // const email = "temp@email.com";
    const { email } = await getUnusedTemporaryCredentials();
    const user = await createUserByEmail(email);
    const result = await getUserById(user.id);
    await removeUserForeignKeyConstraints(user);
    await deleteUserById(user.id);
    expect(result.email).toBe(email);
  });
});

describe("getUserByPassword", () => {
  test("Given correct email and password, it returns a user", async () => {
    // const email = "correct@email.com";
    // const password = "correct password";
    const { email, password } = await getValidCredentials();
    const user = await getUserByPassword(email, password);
    expect(user.email).toBe(email);
  });
  test("Given wrong email and password, it returns nothing", async () => {
    const email = "wrong@email.com";
    const password = "wrong password";
    const user = getUserByPassword(email, password);
    await expect(user).rejects.toBeDefined();
  });
});

describe("getUserByToken", () => {
  test("Given correct email and token, it returns a user", async () => {
    // const { email, token } = await login();
    const { email, token } = await getValidCredentials();
    const result = await getUserByToken(email, token);
    expect(result.email).toBe(email);
  });
  test("Given no email, it throws an error", async () => {
    const { token } = await getValidCredentials();
    let noEmail: any, result: any;
    // const token =
    // "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";

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
    // const id = 2;
    const { userId } = await getValidCredentials();
    const user = await getUserById(userId);
    // const user = await getUserById(id);
    const result = Number(user.id);
    expect(result).toBe(userId);
    // expect(result).toBe(id);
  });
  test("Given invalid id, it returns nothing", async () => {
    const id = -1;
    const user = await getUserById(id);
    expect(user).toBeFalsy();
  });
});
