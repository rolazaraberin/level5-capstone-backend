import { isSignupEmailAvailable } from "./signupUtils";

jest.setTimeout(25000);

describe("isSignupEmailAvailable", () => {
  test("Given an available email, it returns true", emailAvailable);
  test("Given an unavailable email, it returns false", emailUnavailable);
  test("Given no email, it throws an error", noEmail);
  test("Given an object, it throws an error", objectEmail);
});

async function emailAvailable() {
  const email = "new@email.com";
  const result = await isSignupEmailAvailable(email);
  expect(result).toBe(true);
}

async function emailUnavailable() {
  const email = "correct@email.com";
  const result = await isSignupEmailAvailable(email);
  expect(result).toBe(false);
}

async function noEmail() {
  let email: any, result: any;

  email = undefined;
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();

  email = null;
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();

  email = "";
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();
}

async function objectEmail() {
  let email: any, result: any;

  email = {};
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();

  email = { email: "correct@email.com" };
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();

  email = [];
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();

  email = ["correct@email.com"];
  result = isSignupEmailAvailable(email);
  await expect(result).rejects.toBeDefined();
}
