import axios from "axios";
import { fullURL } from "./routes/router";
import dotenv from "dotenv";
dotenv.config();

// const host = process.env.host;
// const cartApi = URL.cart;
const email = process.env.userEmail;
const password = process.env.userPassword;
jest.setTimeout(25000);

describe("Backend server", () => {
  it("should return error given invalid cart PUT request", testPutCartError);
  it("should return success given valid cart PUT request", testPutCartSuccess);
  it.skip(
    "should error given invalid cart DELETE request",
    testDeleteItemError
  );
  it.skip(
    "should success given invalid cart DELETE request",
    testDeleteItemSuccess
  );
});

async function testPutCartError() {
  const data = { cart: {}, item: {} };
  const request = axios.put(fullURL.cart, data);
  await expect(request).rejects.toThrow();
}

async function testPutCartSuccess() {
  const data = {
    cart: { itemsTable: "cartItems1" },
    item: { id: 3, itemID: 3 },
    user: { email, password },
  };
  const request = axios.put(fullURL.cart, data);
  await expect(request).resolves.not.toThrow();
}

async function testDeleteItemError() {
  const data = {
    data: {
      cart: {},
      item: {},
    },
  };
  const request = axios.delete(fullURL.cart, data);
  await expect(request).rejects.toThrow();
}

async function testDeleteItemSuccess() {
  const data = {
    data: {
      cart: { itemsTable: "cartItems" },
      item: { id: 1, itemID: 1 },
    },
  };
  const request = axios.delete(fullURL.cart, data);
  await expect(request).resolves.not.toThrow();
}
