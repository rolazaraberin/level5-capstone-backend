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
const nodeUtils_1 = require("../utils/nodeUtils");
const database_1 = require("../models/database");
const authenticate_1 = __importDefault(require("./authenticate"));
const httpCodes_1 = __importDefault(require("../utils/httpCodes"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
const User_1 = __importDefault(require("../models/entities/User"));
const Login_1 = __importDefault(require("../models/entities/Login"));
const dotenv_1 = __importDefault(require("dotenv"));
const cartUtils_1 = require("./cartUtils");
const userUtils_1 = require("./userUtils");
const account = { fetchInfo, delete: _delete };
exports.default = account;
dotenv_1.default.config();
const disableEmails = process.env.disableEmails;
function fetchInfo(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, token } = request.body;
            const userID = yield authenticate_1.default.token(email, token);
            const account = yield getAccountInfo(userID);
            if (!account)
                return response.status(401).send("ERROR: Cannot retrieve account");
            response.status(200).send(account);
        }
        catch (asyncError) {
            handleAsyncError(asyncError, response);
            // const error = await asyncError;
            // debugger;
            // const message = error.message;
            // const code = error.code;
            // response.status(code).send(message);
        }
    });
}
function getAccountInfo(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const account = yield (0, userUtils_1.getUserById)(userID);
            account.cart = yield (0, cartUtils_1.getCartById)(account.cartID);
            return account;
        }
        catch (error) {
            debugger;
        }
    });
}
function _delete(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = request.body;
            const { userID } = yield authenticate_1.default.password(email, password);
            yield deleteLogin(email);
            yield deleteUser(userID);
            response.status(200).send("SUCCESS: Account deleted");
            if (disableEmails !== "true")
                sendEmail_1.default.deleteConfirmation(email);
        }
        catch (asyncError) {
            const error = yield asyncError;
            let message = error.message;
            let code = error.code || httpCodes_1.default.error.general;
            if (code === httpCodes_1.default.error.unauthenticated)
                message = "ERROR: Incorrect password";
            response.status(code).send(message);
        }
    });
}
function deleteUser(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        // const table = "user";
        // const columns = ["id"];
        // const values = quoteValues([userID]);
        // const sql = `DELETE FROM ${table} WHERE ${columns} = ${values}`;
        // const data = await runRaw(sql);
        const data = yield database_1.typeorm.getRepository(User_1.default).delete(userID);
        return data;
    });
}
function deleteLogin(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailHash = (0, nodeUtils_1.hash)(email);
        // const table = "login";
        // const columns = ["emailHash"];
        // const values = quoteValues([emailHash]);
        // const sql = `DELETE FROM ${table} WHERE ${columns} = ${values}`;
        // const data = await runRaw(sql);
        const columnsMatchValues = { emailHash };
        const data = yield database_1.typeorm.getRepository(Login_1.default).delete(columnsMatchValues);
        return data;
    });
}
function handleAsyncError(asyncError, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = yield asyncError;
        const message = error.message;
        const code = error.code || httpCodes_1.default.error.general;
        response.status(code).send(message);
    });
}
