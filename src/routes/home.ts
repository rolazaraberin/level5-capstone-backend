import { Request, Response } from "express";

export default urlHome;

function urlHome(_request: Request, response: Response) {
  response.sendFile("index.html", { root: "public" });
  // response.sendFile("home.html", { root: "public" });
}
