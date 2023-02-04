"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = __importDefault(require("./authenticate"));
const dbToken_1 = __importDefault(require("./dbToken"));
const router_1 = require("../routes/router");
const logout = { withToken };
exports.default = logout;
function withToken(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, token } = request.body;
            yield authenticate_1.default.token(email, token);
            // await authenticateToken(email, token);
            yield dbToken_1.default.invalidate(email);
            // await authenticate.invalidateToken(email);
            // await invalidateToken(email);
            response.status(200).send("SUCCESS: logged out");
        }
        catch (asyncError) {
            const { error, code, message } = yield (0, router_1.handleAsyncError)(asyncError);
            // const error = await asyncError;
            // const message = error.message;
            // response.status(httpCodes.error.unauthenticated).send(message);
            response.status(code).send(message);
        }
    });
}
// async function authenticateToken(email: string, token: string) {
//   const emailHash = hash(email);
//   const table = "login";
//   const columns = ["emailHash", "token"];
//   const values = quoteValues([emailHash, token]);
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = ${values[0]} AND ${columns[1]} = ${values[1]}`;
//   const data = await db.sql(sql);
//   const userID = isEmpty(data) ? null : data[0].userID;
//   if (userID) return userID;
//   else throw new Error("ERROR: Invalid account");
// }
// async function invalidateToken(email: string) {
//   const emailHash = hash(email);
//   const table = "login";
//   const columns = ["token"];
//   const values = quoteValues([""]);
//   const target = ["emailHash"];
//   const match = quoteValues([emailHash]);
//   const sql = `UPDATE ${table} SET ${columns} = ${values} WHERE ${target} = ${match}`;
//   const data = await db.sql(sql);
//   // const userID = isEmpty(data) ? null : data[0].userID;
//   const { affectedRows } = data;
//   if (affectedRows) return affectedRows;
//   else throw new Error("ERROR: Invalid account");
// }
