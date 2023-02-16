import { NextFunction, Request, response, Response } from "express";
import { handleAsyncError } from "../routes/router";
import authenticate from "../controllers/authenticate";
import { Cart, User } from "../models/types";

const validate = { token, cart };
export default validate;

async function token(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, token } = request.body.user;
    await authenticate.token(email, token);
    return next();
  } catch (asyncError) {
    const { code, message } = await handleAsyncError(asyncError);
    response.status(code).send(message);
  }
}

async function cart(cart: Cart, user: User) {
  if (!cart.id || !cart.itemsTable) throw new Error("ERROR: invalid cart id");
  const userID = await authenticate.token(user.email, user.token);
  if (cart.id !== userID) throw new Error("ERROR: mismatching cart id");
}
