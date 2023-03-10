import {
  createLoginByPassword,
  deleteLoginByEmail,
  getUserIdByPassword,
  loginWithPassword,
  loginWithToken,
} from "./loginUtils";
import {
  getUnusedCredentials,
  getValidCredentials,
  getValidTemporaryCredentials,
  removeLoginRelationalTables,
} from "./testUtils";
import { createUserByEmail } from "./userUtils";

jest.setTimeout(25000);

describe("deleteLoginByEmail", () => {
  test("Given an email, it deletes a login", deleteWithEmail);
  test("Given no email, it throws an error", noEmail);
  test("Given invalid email, it throws an error", invalidEmail);

  //FUNCTIONS////////////////////////////////////////////

  async function deleteWithEmail() {
    const { email, password, user } = await getValidTemporaryCredentials();
    await deleteLoginByEmail(email);
    await removeLoginRelationalTables(user);
    const result = loginWithPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }

  async function noEmail() {
    let email: any, result: any;
    email = "";
    result = deleteLoginByEmail(email);
    await expect(result).rejects.toBeDefined();

    email = undefined;
    result = deleteLoginByEmail(email);
    await expect(result).rejects.toBeDefined();

    email = null;
    result = deleteLoginByEmail(email);
    await expect(result).rejects.toBeDefined();
  }

  async function invalidEmail() {
    let invalidEmail: any, result: any;

    invalidEmail = {};
    result = deleteLoginByEmail(invalidEmail);
    await expect(result).rejects.toBeDefined();

    invalidEmail = [];
    result = deleteLoginByEmail(invalidEmail);
    await expect(result).rejects.toBeDefined();

    invalidEmail = { email: "correct@email.com" };
    result = deleteLoginByEmail(invalidEmail);
    await expect(result).rejects.toBeDefined();

    invalidEmail = ["correct@email.com"];
    result = deleteLoginByEmail(invalidEmail);
    await expect(result).rejects.toBeDefined();
  }
});

describe("getUserIdByPassword", () => {
  test(
    "Given correct email and password, it returns user id",
    correctEmailPassword
  );
  test(
    "Given wrong email and password, it returns nothing",
    wrongEmailPassword
  );
  test("Given no email, it throws error", noEmail);
  test("Given no password, it throws error", noPassword);
  test("Given object email, it throws error", objectEmail);
  test("Given object password, it throws error", objectPassword);

  //FUNCTIONS/////////////////////////////////////////////

  async function correctEmailPassword() {
    const { email, password } = await getValidCredentials();
    const userId = await getUserIdByPassword(email, password);
    expect(userId).toBeDefined();
  }

  async function noEmail() {
    const { password } = await getValidCredentials();
    let email: any, result: any;

    email = "";
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = undefined;
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = null;
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }

  async function noPassword() {
    const { email } = await getValidCredentials();
    let password: any, result: any;

    password = "";
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    password = undefined;
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    password = null;
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }

  async function wrongEmailPassword() {
    let email: string, password: string, result: any;

    email = "wrong@email.com";
    password = "correct password";
    result = await getUserIdByPassword(email, password);
    expect(result).toBeFalsy();

    email = "correct@email.com";
    password = "wrong password";
    result = await getUserIdByPassword(email, password);
    expect(result).toBeFalsy();
  }

  async function objectPassword() {
    const { email } = await getValidCredentials();
    let password: any, result: any;

    password = {};
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    password = [];
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    password = { password: "correct password" };
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    password = ["correct password"];
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }

  async function objectEmail() {
    const { password } = await getValidCredentials();
    let email: any, result: any;

    email = {};
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = [];
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = { email: "correct@email.com" };
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = ["correct@email.com"];
    result = getUserIdByPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }
});

describe("createLoginByPassword", () => {
  test("Given an available email and password, it creates a login", async () => {
    const { email, password } = await getUnusedCredentials();
    const user = await createUserByEmail(email);
    await createLoginByPassword(email, password, user);
    const result = await getUserIdByPassword(email, password);
    expect(result).toBe(user.id);
  });
});

describe("loginWithPassword", () => {
  test("Given correct email and password, it returns a user and token", async () => {
    const { email, password } = await getValidCredentials();
    const { user, token } = await loginWithPassword(email, password);
    expect(user.email).toBe(email);
    expect(token).toBeDefined();
  });
});

describe("loginWithToken", () => {
  test("Given correct email and token, it returns a user", async () => {
    const { email, token } = await getValidCredentials();
    const user = await loginWithToken(email, token);
    expect(user.email).toBe(email);
  });
});
