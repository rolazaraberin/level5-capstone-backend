import {
  getAccountByToken,
  deleteAccountByPassword,
  createAccountByPassword,
} from "./accountUtils";
import { getCartById, getCartByUser } from "./cartUtils";
import { loginWithPassword } from "./loginUtils";
import { getUserByPassword } from "./userUtils";
import {
  getValidCredentials,
  getValidTemporaryCredentials,
  getUnusedCredentials,
} from "./testUtils";

jest.setTimeout(250000);

describe("getAccountByToken", () => {
  test("Given an email and token, it fetches account info", getByToken);
  test("Given incorrect email and token, it returns error", getByWrongToken);
  test("Given no email, it returns error", getByNoEmail);
  test("Given no token, it returns error", getByNoToken);

  //FUNCTIONS////////////////////////////////////////////

  async function getByToken() {
    const { email, token } = await getValidCredentials();
    const account = await getAccountByToken(email, token);
    expect(account.email).toBe(email);
  }
  async function getByWrongToken() {
    const wrongEmail = "wrong@email.com";
    const wrongToken = "WRONG-TOKEN";
    const result = getAccountByToken(wrongEmail, wrongToken);
    await expect(result).rejects.toBeDefined();
  }
  async function getByNoEmail() {
    const { token } = await getValidCredentials();
    let noEmail: any, result: any;
    noEmail = "";
    result = getAccountByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = {};
    result = getAccountByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = [];
    result = getAccountByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = undefined;
    result = getAccountByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();

    noEmail = null;
    result = getAccountByToken(noEmail, token);
    await expect(result).rejects.toBeDefined();
  }
  async function getByNoToken() {
    const { email } = await getValidCredentials();
    let noToken: any, result: any;
    noToken = "";
    result = getAccountByToken(email, noToken);
    await expect(result).rejects.toBeDefined();

    noToken = {};
    result = getAccountByToken(email, noToken);
    await expect(result).rejects.toBeDefined();

    noToken = [];
    result = getAccountByToken(email, noToken);
    await expect(result).rejects.toBeDefined();

    noToken = undefined;
    result = getAccountByToken(email, noToken);
    await expect(result).rejects.toBeDefined();

    noToken = null;
    result = getAccountByToken(email, noToken);
    await expect(result).rejects.toBeDefined();
  }
});

describe("createAccountByPassword", () => {
  test("Given a new email and password, it creates an account", newAccount);

  //FUNCTIONS////////////////////////////////////////////

  async function newAccount() {
    const { email, password } = await getUnusedCredentials();
    const { user } = await createAccountByPassword(email, password);
    const cart = await getCartById(user.cartID);
    const cartID = Number(cart.id);
    const result = loginWithPassword(email, password);
    // await deleteAccountByPassword(email, password);
    expect(user.email).toBe(email);
    expect(cartID).toBe(user.cartID);
    await expect(result).resolves.toBeDefined();
  }
});

describe("deleteAccountByPassword", () => {
  test(
    "Given an email and password, it deletes all account info",
    deleteByPassword
  );
  test("Given incorrect email and password, it returns error", wrongDelete);

  //FUNCTIONS////////////////////////////////////////////

  async function deleteByPassword() {
    let result: any;

    // const { email, password, cartID } = await createAccount();
    const { email, password, cartID } = await getValidTemporaryCredentials();
    await deleteAccountByPassword(email, password);
    result = getUserByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    result = getCartById(cartID);
    await expect(result).rejects.toBeDefined();

    result = loginWithPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }

  async function wrongDelete() {
    let email: string, password: string, result: any;

    email = "wrong@email.com";
    password = "correct password";
    result = deleteAccountByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = "correct@email.com";
    password = "wrong password";
    result = deleteAccountByPassword(email, password);
    await expect(result).rejects.toBeDefined();

    email = "wrong@email.com";
    password = "wrong password";
    result = deleteAccountByPassword(email, password);
    await expect(result).rejects.toBeDefined();
  }
});
