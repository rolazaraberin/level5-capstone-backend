"use strict";
// export default { up, down };
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
exports.down = exports.up = void 0;
function up(table) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield table.schema
            .createTable("item", function (column) {
            column.increments("id").primary().notNullable();
            column.string("name");
            column.float("price");
            column.string("image");
            column.string("description");
        })
            .createTable("cart", function (column) {
            //TODO: CREATE NEW CART TABLE PER USER
            column.increments("id").primary().notNullable();
            column.string("itemsTable");
            column.integer("totalQuantity");
            column.integer("totalPrice");
            column.foreign("itemsTable");
        })
            .createTable("cartItems1", function (column) {
            //TODO: CREATE NEW CART TABLE PER USER
            column.integer("id").primary().notNullable();
            column.integer("itemID");
            column.integer("quantity");
            column.integer("subtotal");
            column.foreign("id");
            column.foreign("itemID");
        })
            .createTable("inventory", function (column) {
            //TODO: CREATE NEW CART TABLE PER USER
            column.increments("id").primary().notNullable();
            column.string("itemsTable");
            column.integer("totalQuantity");
            column.integer("totalPrice");
            column.foreign("itemsTable");
        })
            .createTable("inventoryItems", function (column) {
            column.integer("id").primary().notNullable();
            column.integer("itemID");
            column.integer("quantity");
            column.integer("subtotal");
            column.foreign("id");
            column.foreign("itemID");
        });
    });
}
exports.up = up;
function down(table) {
    return __awaiter(this, void 0, void 0, function* () {
        return table.schema
            .dropTable("item")
            .dropTable("cart")
            .dropTable("cartItems1")
            .dropTable("inventory")
            .dropTable("inventoryItems");
    });
}
exports.down = down;
