import httpCodes, { HttpError } from "../utils/httpCodes";
import { Cart, Item, User } from "../models/types";
import { isSignupEmailAvailable } from "./signupUtils";

export {
  validateEmail,
  validateToken,
  validatePassword,
  validateCart,
  validateCartId,
  validateItem,
  validateSignupEmailAvailable,
  validateUser,
};

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

function validateCart(cart: Cart) {
  if (!cart || !cart.id) {
    const error = new Error("ERROR: invalid cart") as HttpError;
    error.code = httpCodes.error.badRequest;
    throw error;
  }
}

function validateCartId(id: number) {
  if (!id || typeof Number(id) !== "number") {
    const error = new Error("ERROR: invalid cart") as HttpError;
    error.code = httpCodes.error.badRequest;
    throw error;
  }
}

function validateItem(item: Item) {
  if (!item || !item.id) {
    const error = new Error("ERROR: invalid item") as HttpError;
    error.code = httpCodes.error.badRequest;
    throw error;
  }
}

function validateSignupEmailAvailable(email: string) {
  if (!isSignupEmailAvailable(email))
    throw new Error("ERROR: email is not available");
}

function validateUser(user: User, errorMessage = "ERROR: invalid user") {
  if (!user || !user.id) {
    const error = new Error(errorMessage) as HttpError;
    error.code = httpCodes.error.badRequest;
    throw error;
  }
}
