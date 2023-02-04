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
exports.getCartByToken = exports.getCartById = void 0;
const database_1 = require("../models/database");
const userUtils_1 = require("./userUtils");
// export default cartUtils;
function getCartById(cartID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let table = "public.cart";
            // let idColumn = "id";
            // sql = `SELECT * FROM ${table} WHERE ${idColumn} = ${account.cartID}`;
            // data = await runRaw(sql);
            // account.cart = data[0];
            // table = "cart";
            let columnsMatchValues = { id: cartID };
            let data = yield database_1.knex.table(table).select().where(columnsMatchValues);
            const cart = data[0];
            table = `public.${cart.itemsTable}`;
            const table2 = "public.item";
            const idColumn = `${table}.id`;
            const idColumn2 = `${table2}.id`;
            columnsMatchValues = {};
            columnsMatchValues[`${idColumn}`] = idColumn2;
            // sql = `SELECT * FROM ${table} JOIN ${table2} ON ${idColumn} = ${idColumn2}`;
            // data = await runRaw(sql);
            data = yield database_1.knex.table(table).select().join(table2, columnsMatchValues);
            cart.items = data;
            return cart;
        }
        catch (error) {
            debugger;
        }
    });
}
exports.getCartById = getCartById;
function getCartByToken(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, userUtils_1.getUserByToken)(email, token);
        return yield getCartById(user.cartID);
    });
}
exports.getCartByToken = getCartByToken;
