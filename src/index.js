const express = require("express");
const cors = require("cors");
const router = require("./router/router");

const app = express();
const hostname = process.env.HOST || "localhost";
// const port = Number(process.env.PORT) || 8080;
const port = process.env.PORT || 8080;
const baseUrl = "/";

console.log("Starting server...");
// app.use(cors());
// app.use(myCors);
app.use(express.static("public"));
app.use(express.json()); //REQUIRED TO ACCEPT REQUESTS WITH JSON BODY
app.use(baseUrl, router);
app.listen(port, handleListen);
// app.listen(port, hostname, handleListen);

function handleListen() {
  console.log(`Listening on ${hostname}:${port}`);
}

function myCors(_request, response, next) {
  response.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}
