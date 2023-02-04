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
// import { omit, filter } from "lodash";
const utilityFunctionsServer_1 = require("../utilityFunctionsServer");
const cartUtils_1 = require("../controllers/cartUtils");
// const knex = getKnex(config, Knex);
const knex = (0, knex_1.default)(knexfile_1.default);
// const cartData = updateData("cart");
const inventoryData = updateData("inventory");
exports.default = { idKey, cartData, inventoryData, updateData };
function idKey(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _a = request.body, { table, id } = _a, data = __rest(_a, ["table", "id"]);
            yield knex.table(table).update(data).where("id", "=", id);
            const result = yield knex.table(table).select();
            response.status(200).send(result);
        }
        catch (error) {
            response.status(400).send(error.message);
        }
    });
}
function updateData(route) {
    let mainTable;
    if (route === "cart")
        mainTable = "cart";
    if (route === "inventory")
        mainTable = "inventory";
    return function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (0, utilityFunctionsServer_1.getValidValues)(request.body);
                yield knex.table(mainTable).update(data[mainTable]);
                const itemsTable = data[mainTable].itemsTable;
                const itemID = data["item"].itemID;
                yield knex
                    .table(itemsTable)
                    .update(data["item"])
                    .where("itemID", "=", itemID);
                let result = {};
                result[mainTable] = yield knex.table(mainTable).select();
                result[itemsTable] = yield knex.table(itemsTable).select();
                response.status(200).send(result);
            }
            catch (error) {
                debugger;
                response.status(400).send(error.message);
            }
        });
    };
}
function cartData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validValues = (0, utilityFunctionsServer_1.getValidValues)(request.body);
            const table = "cart";
            const cart = validValues.cart;
            yield knex.table(table).update(cart);
            const itemsTable = (yield (0, cartUtils_1.getCartById)(cart.id)).itemsTable;
            const item = validValues.item;
            const itemID = item.id;
            const columnsMatchValues = { id: itemID };
            yield knex.table(itemsTable).update(item).where(columnsMatchValues);
            const result = (0, cartUtils_1.getCartById)(cart.id);
            response.status(200).send(result);
        }
        catch (error) {
            debugger;
            response.status(400).send(error.message);
        }
    });
}
// function toValidValues(value, property, object) {
//   debugger;
// }
function getKnex(config, knex) {
    switch (config.mode) {
        case "development":
            return knex(config.development);
        case "production":
            return knex(config.remote);
    }
}
