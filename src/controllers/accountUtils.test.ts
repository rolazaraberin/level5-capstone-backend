// import axios from "axios";
// import { timeout } from "../utils/utilityFunctions";
// import { fullURL } from "../routes/router";
import {
  getAccountByToken,
  deleteAccountByPassword,
  createAccountByPassword,
} from "./accountUtils";
import { getCartById, getCartByUser } from "./cartUtils";
import { loginWithPassword } from "./loginUtils";
import { getUserByPassword } from "./userUtils";

jest.setTimeout(35000);

describe("getAccountByToken", () => {
  test("Given an email and token, it fetches account info", getByToken);
  test("Given incorrect email and token, it returns error", getByWrongToken);
  test("Given no email, it returns error", getByNoEmail);
  test("Given no token, it returns error", getByNoToken);

  //FUNCTIONS////////////////////////////////////////////

  async function getByToken() {
    const email = "correct@email.com";
    const token =
      "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";

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
    const token =
      "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";
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
    const email = "correct@email.com";
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
    const email = "temporary@email.com";
    const password = "temporary password";
    const account = await createAccountByPassword(email, password);
    const cart = await getCartById(account.cartID);
    const cartID = Number(cart.id);
    const result = loginWithPassword(email, password);
    await deleteAccountByPassword(email, password);
    expect(account.email).toBe(email);
    expect(cartID).toBe(account.cartID);
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

    const { email, password, cartID } = await createAccount();
    await deleteAccountByPassword(email, password);
    result = await getUserByPassword(email, password);
    expect(result).not.toBeDefined();

    result = await getCartById(cartID);
    expect(result).toBeFalsy();

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

//UTILS//////////////////////////////////////////////////////

async function createAccount() {
  const email = "temporary@email.com";
  const password = "temporary password";
  const result = await createAccountByPassword(email, password);
  const cartID = result.cartID;
  return { email, password, cartID };
}
