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
exports.getUserByToken = exports.getUserById = void 0;
const Login_1 = __importDefault(require("../models/entities/Login"));
const nodeUtils_1 = require("../utils/nodeUtils");
const database_1 = require("../models/database");
function getUserById(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = "public.user";
            let idColumn = "id";
            const itemsColumn = "itemsTable";
            let sql = `SELECT * FROM ${table} WHERE ${idColumn} = ${userID}`;
            const columnsMatchValues = { id: userID };
            let data = yield (0, database_1.sql)(sql);
            const user = data[0];
            return user;
        }
        catch (error) {
            debugger;
        }
    });
}
exports.getUserById = getUserById;
function getUserByToken(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email)
            throw new Error("ERROR: email must be provided");
        if (!token)
            throw new Error("ERROR: token must be provided");
        const emailHash = (0, nodeUtils_1.hash)(email);
        const columnsMatchValues = { emailHash, token };
        const data = yield database_1.typeorm.manager
            .getRepository(Login_1.default)
            .findOne({ where: columnsMatchValues, relations: { user: true } });
        const user = data.user;
        return user;
    });
}
exports.getUserByToken = getUserByToken;
