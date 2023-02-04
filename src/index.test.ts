// const axios = require("axios");
import axios from "axios";

jest.setTimeout(10000);

describe.skip("Backend server", () => {
  it("should return 404 given invalid cart PUT request", testPutCartError);
  it("should return 200 given valid cart PUT request", testPutCartSuccess);
  it(
    "should return 404 given invalid cart DELETE request",
    testDeleteItemError
  );
  it(
    "should return 200 given invalid cart DELETE request",
    testDeleteItemSuccess
  );
});

function testPutCartError() {
  const request = axios.put(
    "https://level4-capstone-backend.herokuapp.com/api/cart",
    {
      cart: {},
      item: {},
    }
  );
  expect(request).rejects.toThrow();
}

function testPutCartSuccess() {
  const request = axios.put(
    "https://level4-capstone-backend.herokuapp.com/api/cart",

    {
      cart: { itemsTable: "cartItems" },
      item: { id: 3, itemID: 3 },
    }
  );
  expect(request).resolves.not.toThrow();
}

function testDeleteItemError() {
  const request = axios.delete(
    "https://level4-capstone-backend.herokuapp.com/api/cart",
    {
      data: {
        cart: {},
        item: {},
      },
    }
  );
  expect(request).rejects.toThrow();
}

function testDeleteItemSuccess() {
  const request = axios.delete(
    "https://level4-capstone-backend.herokuapp.com/api/cart",
    {
      data: {
        cart: { itemsTable: "cartItems" },
        item: { id: 1, itemID: 1 },
      },
    }
  );
  expect(request).resolves.not.toThrow();
}
