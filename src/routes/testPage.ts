import { Request, Response } from "express";

export function testPage(request: Request, response: Response) {
  response.send("Welcome test!");
}
