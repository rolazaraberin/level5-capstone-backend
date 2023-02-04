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
const httpCodes_1 = __importDefault(require("../utils/httpCodes"));
const database_1 = require("../models/database");
const nodeUtils_1 = require("../utils/nodeUtils");
const utilityFunctions_1 = require("../utils/utilityFunctions");
const Login_1 = __importDefault(require("../models/entities/Login"));
const authenticate = {
    password,
    token,
    email,
    itemsTable,
    // invalidateToken,
    // getNewToken,
    // saveToken,
};
exports.default = authenticate;
function password(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        // try {
        // const { emailHash, passwordHash } = requestBody;
        // const { email, password } = requestBody;
        if (!email || !password) {
            const error = new Error("ERROR: email and password must be provided");
            error.code = httpCodes_1.default.error.unauthenticated;
            throw error;
        }
        const emailHash = (0, nodeUtils_1.hash)(email);
        const passwordHash = (0, nodeUtils_1.hash)(password);
        // const table = "login";
        // const Table = Login;
        // const Property = User;
        // const columns = ["emailHash", "passwordHash"];
        // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
        // const data = await db.sql(sql);
        const columnsMatchValues = { emailHash, passwordHash };
        // const data = await db.knex.table(table).select().where(columnsMatchValues);
        const data = yield database_1.typeorm.manager
            .getRepository(Login_1.default)
            .findOne({ where: columnsMatchValues, relations: { user: true } });
        // const data = await db.typeorm
        //   .select()
        //   .from(Table, "login")
        //   .leftJoinAndSelect(Property, "user")
        //   .where(columnsMatchValues)
        //   .getOne();
        const userID = data.user.id;
        const token = data.token;
        // const userID = isEmpty(data) ? null : data[0].userID;
        // const token = isEmpty(data) ? null : data[0].token;
        if (userID === null) {
            const error = new Error("ERROR: Incorrect email or password");
            error.code = httpCodes_1.default.error.unauthenticated;
            throw error;
        }
        return { userID, token };
        // } catch (mismatchingEmailAndPassword) {
        // return null;
        // }
    });
}
function token(email, token) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, utilityFunctions_1.isEmpty)(email) || (0, utilityFunctions_1.isEmpty)(token)) {
            const error = new Error("ERROR: email and password must be provided");
            error.code = httpCodes_1.default.error.unauthenticated;
            throw error;
        }
        const emailHash = (0, nodeUtils_1.hash)(email);
        if (!emailHash) {
            const error = new Error("ERROR: Invalid email or token");
            error.code = httpCodes_1.default.error.unauthenticated;
            throw error;
        }
        // const table = "login";
        // const columns = ["emailHash", "token"];
        // const values = quoteValues([emailHash, token]);
        // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = ${values[0]} AND ${columns[1]} = ${values[1]}`;
        // const data = await db.sql(sql);
        const columnsMatchValues = { emailHash, token };
        // const data = await knex.table(table).select().where(columnsMatchValues);
        const data = yield database_1.typeorm.manager
            .getRepository(Login_1.default)
            .findOne({ where: columnsMatchValues, relations: { user: true } });
        // const userID = isEmpty(data) ? null : data[0].userID;
        const userID = (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userID) {
            const error = new Error("ERROR: Invalid email or token");
            error.code = httpCodes_1.default.error.unauthenticated;
            throw error;
        }
        return userID;
    });
}
function email(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedEmail = (0, nodeUtils_1.hash)(email);
        const authenticateEmailHash = emailHash;
        yield authenticateEmailHash(hashedEmail);
        // const columnsMatchValues = { emailHash };
        // const data = await typeorm.manager
        //   .getRepository(Login)
        //   .findOne({ where: columnsMatchValues });
        // if (isEmpty(data)) {
        //   const error: any = new Error("ERROR: Account does not exist");
        //   error.code = httpCodes.error.unauthenticated;
        //   throw error;
        // } else return "Email validated";
    });
}
function emailHash(emailHash) {
    return __awaiter(this, void 0, void 0, function* () {
        const columnsMatchValues = { emailHash };
        const data = yield database_1.typeorm.manager
            .getRepository(Login_1.default)
            .findOne({ where: columnsMatchValues });
        if ((0, utilityFunctions_1.isEmpty)(data)) {
            const error = new Error("ERROR: Account does not exist");
            error.code = httpCodes_1.default.error.unauthenticated;
            throw error;
        }
        else
            return "Email validated";
    });
}
function itemsTable(tableId) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedEmail = tableId;
        const authenticateEmailHash = emailHash;
        yield authenticateEmailHash(hashedEmail);
    });
}
