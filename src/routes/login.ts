import { NextFunction, Request, Response } from "express";

const login = { withToken, withPassword };

export default login;

function withToken(request: Request, response: Response, next: NextFunction) {
  debugger;
  const { email, token } = request.body;
  if (!token) return next();
  debugger;
}

function withPassword() {}
