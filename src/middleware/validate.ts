import { NextFunction, Request, response, Response } from "express";
import { handleAsyncError } from "../utils/errorUtils";
import authenticate from "../controllers/authenticate";
// import { Cart, User } from "../models/types";

// const validate = { token, cart };
const validate = { token };
export default validate;

async function token(request: Request, response: Response, next: NextFunction) {
  try {
    const { email, token } = request.body.user;
    await authenticate.token(email, token);
    return next();
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    response.status(code).send(message);
  }
}
