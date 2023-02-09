import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

export function testPage(request: Request, response: Response) {
  const message = JSON.stringify({
    method: request.method,
    mode: process.env.mode,
    hostEnvironment: process.env.hostEnvironment,
  });
  response.send(message);
}
