import axios from "axios";
import { fullUrl } from "./routes/router";
// import dotenv from "dotenv";
import { Cart, Item, User } from "./models/types";
import { getCartByToken } from "./controllers/cartUtils";
import { getUserByToken } from "./controllers/userUtils";
import { loginWithPassword } from "./controllers/loginUtils";
import { createAccountByPassword } from "./controllers/accountUtils";
import { getValidCredentials } from "./controllers/testUtils";
// dotenv.config();

// const host = process.env.host;
// const cartApi = URL.cart;
// const email = process.env.userEmail;
// const password = process.env.userPassword;
jest.setTimeout(250000);

describe("Backend server", () => {
  test(
    "Given invalid cart PUT request, it should return error",
    testPutCartError
  );
  test(
    "Given valid cart PUT request, it should return success",
    testPutCartSuccess
  );
  test(
    "Given invalid cart DELETE request, it should return error",
    testDeleteItemError
  );
  test(
    "Given valid cart DELETE request, it should return success",
    testDeleteItemSuccess
  );
});

async function testPutCartError() {
  const { user } = await getValidCredentials();
  const data = { cart: {}, item: {}, user };
  const request = axios.put(fullUrl.cart, data);
  await expect(request).rejects.toThrow();
}

async function testPutCartSuccess() {
  const { email, token } = await getValidCredentials();
  const cart: Cart = await getCartByToken(email, token);
  const { item, startingQuantity } = getItemToPutInCart(cart);
  // let item: Item = cart.items[0];
  // if (!item) item = { id: 3, itemID: 3, quantity: 0 };
  // const startingQuantity = Number(item.quantity);
  // item.quantity = Number(item.quantity) + 1;
  // const user: User = { email, token };
  const user: User = await getUserByToken(email, token);
  const data = { cart, item, user };
  const result = await axios.put(fullUrl.cart, data);

  const originalCartId = Number(cart.id);
  const updatedCart: Cart = result.data;
  const resultId = Number(updatedCart.id);
  const newQuantity = Number(updatedCart.items[0].quantity);
  expect(resultId).toBe(originalCartId);
  expect(newQuantity).toBe(startingQuantity + 1);
}

async function testDeleteItemError() {
  const { user } = await getValidCredentials();
  const data = { data: { cart: {}, item: {}, user } };
  const request = axios.delete(fullUrl.cart, data);
  await expect(request).rejects.toThrow();
}

async function testDeleteItemSuccess() {
  // const email = "correct@email.com";
  // const token =
  // "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";
  // const user: User = { email, token };
  const { email, token, user } = await getValidCredentials();
  // const user: User = await getUserByToken(email, token);
  const cart: Cart = await getCartByToken(email, token);
  let item: Item = cart.items[0];
  if (!item) item = await addItemToCart(cart, user);
  const data = { data: { cart, item, user } };
  const result = await axios.delete(fullUrl.cart, data);

  const originalCartId = cart.id;
  const originalItemId = item.id;
  const updatedCart: Cart = result.data;
  const resultId = updatedCart.id;
  const resultItemId = updatedCart.items[0]?.id;

  //ITEM SHOULD BE COMPLETELY REMOVED FROM CART
  expect(resultId).toBe(originalCartId);
  expect(resultItemId).not.toBe(originalItemId);
}

//UTILS///////////////////////////////////////////////

async function addItemToCart(cart: Cart, user: User) {
  const item: Item = { id: 2, quantity: 1 };
  const data = { cart, item, user };
  const result = await axios.put(fullUrl.cart, data);
  const updatedCart = result.data;
  const resultItem = updatedCart?.items[0];
  expect(resultItem).toBeDefined();
  return resultItem;
}

// async function getValidCredentials() {
//   const email = "correct@email.com";
//   const password = "correct password";
//   let user: User, token: string;
//   try {
//     const data = await loginWithPassword(email, password);
//     user = data.user;
//     token = data.token;
//   } catch (accountDoesntExist) {
//     const data = await createAccountByPassword(email, password);
//     // user = data.user;
//     token = data.token;
//   }

//   // const token =
//   //   "29a891b242d7f1aa62f2086cc18a60324f35a34e52c0f4d86f610622926bcdad";
//   return { email, password, token, user };
// }

function getItemToPutInCart(cart: Cart) {
  let item: Item = cart.items[0];
  if (!item) item = { id: 3, itemID: 3, quantity: 0 };
  const startingQuantity = Number(item.quantity);
  item.quantity = startingQuantity + 1;
  return { item, startingQuantity };
}
