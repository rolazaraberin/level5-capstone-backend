import { Request, Response } from "express";
import authenticate from "./authenticate";
import dbToken from "./dbToken";
import { handleAsyncError } from "../utils/errorUtils";

const logout = { withToken };
export default logout;

async function withToken(request: Request, response: Response) {
  try {
    const { email, token } = request.body;
    await authenticate.token(email, token);
    await dbToken.invalidate(email);
    response.status(200).send("SUCCESS: logged out");
  } catch (asyncError) {
    const { error, code, message } = await handleAsyncError(asyncError);
    response.status(code).send(message);
  }
}
