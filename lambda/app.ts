import { Handler } from "@netlify/functions";
// import app from "../build/index";
import app from "../src/index";
import serverless from "serverless-http";

export const handler: Handler = serverless(app) as any;
