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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_1 = __importDefault(require("../../knexfile"));
const knex_1 = __importDefault(require("knex"));
const utilityFunctionsServer_1 = require("../utilityFunctionsServer");
const cartUtils_1 = require("../controllers/cartUtils");
// const knex = getKnex(config, Knex);
const knex = (0, knex_1.default)(knexfile_1.default);
// const cartData = deleteData("cart");
const inventoryData = deleteData("inventory");
exports.default = { manualData, cartData, inventoryData };
function manualData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _a = request.body, { table } = _a, data = __rest(_a, ["table"]);
            const column = Object.getOwnPropertyNames(data)[0];
            const value = data[column];
            yield knex.table(table).where(column, "=", value).delete();
            const result = yield knex.table(table).select();
            response.status(200).send(result);
        }
        catch (error) {
            response.status(400).send(error.message);
        }
    });
}
function deleteData(route) {
    let mainTable;
    if (route === "cart")
        mainTable = "cart";
    if (route === "inventory")
        mainTable = "inventory";
    return function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const table = "inventory";
                // const { itemID, ...data } = request.body;
                const data = (0, utilityFunctionsServer_1.getValidValues)(request.body);
                yield knex.table(mainTable).update(data[mainTable]);
                const itemsTable = data[mainTable].itemsTable;
                const itemID = data.item.itemID;
                yield knex.table(itemsTable).where("itemID", "=", itemID).delete();
                const result = {};
                result[mainTable] = yield knex.table(mainTable).select();
                result[itemsTable] = yield knex.table(itemsTable).select();
                response.status(200).send(result);
            }
            catch (error) {
                response.status(400).send(error.message);
            }
        });
    };
}
function cartData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const { itemID, ...data } = request.body;
            const validValues = (0, utilityFunctionsServer_1.getValidValues)(request.body);
            // const cart = await cartUtils.get(cartID);
            const cart = validValues.cart;
            // const item = validValues.item;
            const table = "public.cart";
            yield knex.table(table).update(cart);
            const cartID = validValues.cart.id;
            const itemsTable = (yield (0, cartUtils_1.getCartById)(cartID)).itemsTable;
            const itemID = validValues.item.id;
            const columnsMatchValues = { id: itemID };
            //"itemID", "=", itemID
            yield knex.table(itemsTable).where(columnsMatchValues).delete();
            const result = yield (0, cartUtils_1.getCartById)(cartID);
            // const result = {} as any;
            // result.cart = await knex.table(table).select();
            // result[itemsTable] = await knex.table(itemsTable).select();
            response.status(200).send(result);
        }
        catch (error) {
            debugger;
            response.status(400).send(error.message);
        }
    });
}
function getKnex(config, knex) {
    switch (config.mode) {
        case "development":
            return knex(config.development);
        case "production":
            return knex(config.remote);
    }
}
