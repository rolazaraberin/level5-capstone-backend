import { NextFunction, Request, Response } from "express";
import { AuthData } from "../models/types";
import authenticate from "./authenticate";
import dbToken from "./dbToken";
import httpCodes from "../utils/httpCodes";
import { handleAsyncError } from "../utils/errorUtils";

const login = { withToken, withPassword };
export default login;

async function withToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, token } = request.body;
  if (!token) return next();
  try {
    const userID = await authenticate.token(email, token);
    if (!userID)
      return response.status(401).send("ERROR: Incorrect email or password");
    const authInfo: AuthData = { email, token, isTemporary: false };
    response.status(200).send(authInfo);
  } catch (asyncError) {
    const { code, message } = await handleAsyncError(asyncError);
    response.status(code).send(message);
  }
}

async function withPassword(request: Request, response: Response) {
  const { email, password } = request.body;
  try {
    const { userID, token } = await authenticate.password(email, password);
    if (!userID)
      return response.status(401).send("ERROR: Incorrect email or password");
    const authInfo: AuthData = { email, token, isTemporary: false };
    if (!token) {
      authInfo.token = dbToken.getNew(email);
      await dbToken.save(email, authInfo.token);
    }
    response.status(200).send(authInfo);
  } catch (asyncError) {
    const error = await asyncError;
    const message = error.message;
    let code = error.code || httpCodes.error.general;
    if (code >= 600 || typeof code === "string")
      code = httpCodes.error.serverError;
    response.status(code).send(message);
  }
}
