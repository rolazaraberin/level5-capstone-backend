// import axios from "axios";
// import { timeout } from "../utils/utilityFunctions";
// import { fullURL } from "../routes/router";
import { getAccountByToken, deleteAccountByPassword } from "./accountUtils";

jest.setTimeout(25000);

const email = "correct@email.com";
const token =
  "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";
const password = "correct password";

describe.skip("getAccountByToken", () => {
  test("Given an email and token, it fetches account info", getByToken);
  test("Given incorrect email and token, it returns error", getByWrongToken);
  test("Given no email, it returns error", getByNoEmail);
  test("Given no token, it returns error", getByNoToken);
});
describe("deleteAccountByPassword", () => {
  test(
    "Given an email and password, it deletes account info",
    deleteByPassword
  );
  test.skip(
    "Given incorrect email and password, it returns error",
    wrongDelete
  );
});

//ACCOUNT FETCH////////////////////////////////////////

async function getByToken() {
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

//ACCOUNT DELETE//////////////////////////////////////

async function deleteByPassword() {
  const result = await deleteAccountByPassword(email, password);
  expect(true).toBe(false);
}
function wrongDelete() {
  debugger;
  expect(true).toBe(false);
}
