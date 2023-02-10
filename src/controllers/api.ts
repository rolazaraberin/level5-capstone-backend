import { Request, Response } from "express";
import httpCodes from "../utils/httpCodes";
import { typeorm } from "../models/database";
import Login from "../models/entities/Login";

const api = { ping };
export default api;

async function ping(request: Request, response: Response) {
  try {
    await typeorm.getRepository(Login).findOneBy({ emailHash: "" });
    response.send("API ready");
  } catch (asyncError) {
    const error = await asyncError;
    error.message = "ERROR: API not ready. Try again.";
    const code = httpCodes.error.serverError;
    response.status(code).send(error);
  }
}
