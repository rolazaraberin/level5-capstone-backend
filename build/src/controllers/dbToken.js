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
Object.defineProperty(exports, "__esModule", { value: true });
const utilityFunctions_1 = require("../utils/utilityFunctions");
const nodeUtils_1 = require("../utils/nodeUtils");
const database_1 = require("../models/database");
const dbToken = {
    invalidate,
    getNew,
    save,
};
exports.default = dbToken;
function invalidate(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailHash = (0, nodeUtils_1.hash)(email);
        const table = "login";
        // const columns = ["token"];
        // const values = quoteValues([""]);
        // const target = ["emailHash"];
        // const match = quoteValues([emailHash]);
        // const data = await db.sql(sql);
        const columnsToValues = { token: "" };
        const columnsMatchValues = { emailHash };
        const data = yield database_1.knex
            .table(table)
            .update(columnsToValues)
            .where(columnsMatchValues);
        // const userID = isEmpty(data) ? null : data[0].userID;
        const { affectedRows } = data;
        if (affectedRows || data)
            return affectedRows || data;
        else
            throw new Error("ERROR: Invalid account");
    });
}
function getNew(email) {
    // const emailHash = hash(email);
    // const passwordHash = hash(password);
    // const table = "login";
    // const columns = ["emailHash", "passwordHash"];
    // const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
    // const data = await db.sql(sql);
    // const userID = isEmpty(data) ? null : data[0].userID;
    const token = (0, nodeUtils_1.hash)(email + (0, utilityFunctions_1.generateKey)());
    return token;
}
function save(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const emailHash = (0, nodeUtils_1.hash)(email);
        const table = "login";
        const columns = ["token"];
        const values = (0, utilityFunctions_1.quoteValues)([token]);
        const target = "emailHash";
        const match = (0, utilityFunctions_1.quoteValues)([emailHash]);
        const columnsToValues = { token };
        const columnsMatchValues = { emailHash };
        const sql = `UPDATE ${table} SET ${columns} = ${values} WHERE ${target} = ${match}`;
        const result = yield database_1.knex
            .table(table)
            .update(columnsToValues)
            .where(columnsMatchValues);
        // const result = await db.sql(sql);
        return result;
    });
}
