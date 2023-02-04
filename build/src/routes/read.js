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
const knexfile_1 = __importDefault(require("../../knexfile"));
const knex_1 = __importDefault(require("knex"));
const lodash_1 = require("lodash");
const cartUtils_1 = require("../controllers/cartUtils");
// const cartData = readData("cart");
const inventoryData = readData("inventory");
exports.default = { manualData, cartData, inventoryData, allData };
// const knex = getKnex(config, Knex);
const knex = (0, knex_1.default)(knexfile_1.default);
const replacer = undefined;
const spacer = " ";
function readData(route) {
    let mainTable;
    if (route === "cart")
        mainTable = "cart";
    if (route === "inventory")
        mainTable = "inventory";
    return function (request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // result[mainTable] = await knex.select().from(mainTable);
                // let result;
                const data = yield knex.table(mainTable).select();
                let result = Object.assign({}, data[0]);
                const itemsTable = result.itemsTable;
                const items = yield knex
                    .select()
                    .from(itemsTable)
                    .leftJoin("item", `${itemsTable}.itemID`, "item.id");
                result = Object.assign(Object.assign({}, result), { items });
                response.status(200).send(result);
            }
            catch (error) {
                response.status(400).send(error);
            }
        });
    };
}
function cartData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, token } = request.body.user;
            const cart = yield (0, cartUtils_1.getCartByToken)(email, token);
            // const cartString = JSON.stringify(cart);
            // const table = "cart";
            // const columnsMatchValues = {id:cartID};
            // const data = await knex.table(table).select().where(columnsMatchValues);
            // let result = { ...data[0] };
            // const itemsTable = result.itemsTable;
            // const items = await knex
            // .select()
            // .from(itemsTable)
            // .leftJoin("item", `${itemsTable}.itemID`, "item.id");
            // result = { ...result, items };
            // response.status(200).send(cartString);
            response.status(200).send(cart);
        }
        catch (error) {
            debugger;
            response.status(400).send(error);
        }
    });
}
function manualData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { table } = request.body;
            const data = yield knex.table(table).select();
            // response.type("text");
            response.status(200).send(data);
        }
        catch (error) {
            response.status(400).send(error.message);
        }
    });
}
function allData(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, lodash_1.isEmpty)(request.body)) {
            manualData(request, response);
            return;
        }
        try {
            // const data = await knex.select().from("item");
            const item = yield knex.select().from("item");
            const inventory = yield knex.select().from("inventory");
            const inventoryItems = yield knex.select().from("inventoryItems");
            const cart = yield knex.select().from("cart");
            const cartItems = yield knex.select().from("cartItems");
            // const data = JSON.stringify({ students, mentors }, replacer, spacer);
            // const data = JSON.stringify({ items }, replacer, spacer);
            const data = JSON.stringify({ item, inventory, inventoryItems, cart, cartItems }, replacer, spacer);
            // const data = { item, inventory, inventoryItems, cart, cartItems };
            // const message = "Use Postman to send POST, PUT, and DELETE requests to this API";
            response.type("text");
            response.status(200).send(data);
            // response.status(200).send([message, data].join("\n"));
        }
        catch (error) {
            response.status(400).send(error);
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
// async function loginData(request: Request, response: Response) {
//   // const { email, password } = request.body;
//   debugger;
//   try {
//     const userID = await authenticate(request.body);
//     if (!userID)
//       return response.status(401).send("ERROR: Incorrect email or password");
//     const account = await getUserInfo(userID);
//     if (!account)
//       return response.status(401).send("ERROR: Cannot retrieve account");
//     response.status(200).send(account);
//   } catch (_error) {
//     const error = await _error;
//     const message = error.message;
//     const code = error.code;
//     response.status(code).send(message);
//   }
// }
// async function authenticate(requestBody: any) {
//   // try {
//   // const { emailHash, passwordHash } = requestBody;
//   const { email, password } = requestBody;
//   if (!email || !password) {
//     const error = new Error(
//       "ERROR: email and password must be provided"
//     ) as Error & { code: number };
//     error.code = 400;
//     throw error;
//   }
//   const emailHash = hash(email);
//   const passwordHash = hash(password);
//   const table = "login";
//   const columns = ["emailHash", "passwordHash"];
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${emailHash}' AND ${columns[1]} = '${passwordHash}'`;
//   const data = await db.sql(sql);
//   const userID = isEmpty(data) ? null : data[0].userID;
//   return userID;
//   // } catch (mismatchingEmailAndPassword) {
//   // return null;
//   // }
// }
// async function getUserInfo(userID: number) {
//   const table = "user";
//   const columns = ["id"];
//   const sql = `SELECT * FROM ${table} WHERE ${columns[0]} = '${userID}'`;
//   const data = await db.sql(sql);
//   const account = data[0];
//   return account;
// }
