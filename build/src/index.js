"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); //FOR TYPEORM
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
const hostname = process.env.HOST || "localhost";
// const port = Number(process.env.PORT) || 8080;
const port = process.env.PORT || 8000;
const baseUrl = "/";
console.log("Starting server...");
app.use((0, cors_1.default)());
// app.use(myCors);
app.use(express_1.default.static("public"));
app.use(express_1.default.json()); //REQUIRED TO ACCEPT REQUESTS WITH JSON BODY
app.use(baseUrl, router_1.default);
app.listen(port, handleListen);
// app.listen(port, hostname, handleListen);
function handleListen() {
    console.log(`Listening on ${hostname}:${port}`);
}
// function myCors(_request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   response.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// }
