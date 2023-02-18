import httpCodes from "../utils/httpCodes";
import { Cart, User } from "../models/types";
import authenticate from "./authenticate";

export { validateEmail, validateToken, validatePassword, validateCart };

function validateEmail(email: string) {
  if (!email) throw new Error("ERROR: email is required");
  if (typeof email !== "string") throw new Error("ERROR: invalid email");
}

function validateToken(token: string) {
  if (!token) throw new Error("ERROR: token is required");
  if (typeof token !== "string") throw new Error("ERROR: invalid token");
}

function validatePassword(password: string) {
  if (!password) throw new Error("ERROR: password is required");
  if (typeof password !== "string") throw new Error("ERROR: invalid password");
}

async function validateCart(cart: Cart, user: User) {
  const cartId = Number(cart?.id);
  if (!cartId || !cart.itemsTable) throw new Error("ERROR: invalid cart id");
  const userID = await authenticate.token(user.email, user.token);
  if (cartId !== userID) {
    const error = new Error("ERROR: forbidden access to cart") as any;
    error.code = httpCodes.error.forbiddenUser;
    throw error;
  }
}
