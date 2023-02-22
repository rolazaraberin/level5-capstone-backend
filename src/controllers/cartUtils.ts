import { User } from "../models/types";
import { knex, sql } from "../models/database";
import { getUserByToken } from "./userUtils";
import { Cart, Item } from "../models/types";
import { getValidValues } from "../utilityFunctionsServer";
import { validateCart, validateItem, validateCartId } from "./validateUtils";
import { getNextAvailableId } from "./dbUtils";

export {
  getCartById,
  getCartByToken,
  getCartByUser,
  getItemsTable,
  deleteCartById,
  createCart,
  getItemsByCart,
  removeItemFromCart,
  setCart,
  updateCart,
};

async function getCartById(cartID: number) {
  validateCartId(cartID);
  const table = "public.cart";
  const columnsMatchValues = { id: cartID };
  const data = await knex.table(table).select().where(columnsMatchValues);
  const cart: Cart = data[0];
  validateCart(cart);
  cart.items = await getItemsByCart(cart);
  return cart;
}

async function getCartByToken(email: string, token: string) {
  const user = await getUserByToken(email, token);
  return await getCartById(user.cartID);
}

async function getCartByUser(user: User) {
  const foreignKey = user.cartID;
  if (!foreignKey) throw new Error("ERROR: missing user cart information");
  return await getCartById(foreignKey);
}

async function deleteCartById(id: number) {
  const cart = await getCartById(id);
  const itemsTable = cart.itemsTable;
  await knex.schema.dropTable(itemsTable);

  const table = "cart";
  const cartIdMatches = { id: cart.id };
  await knex.table(table).delete().where(cartIdMatches);
}

async function createCart() {
  await sql.initialized();
  const table = "cart";
  const id = await getNextAvailableId(table);
  const itemsTable = await createItemsTableById(id);
  const cart: Cart = { id, itemsTable };
  await knex.table(table).insert(cart);
  return id;
}

async function createItemsTableById(id: number) {
  const tableName = "cartItems" + id;
  const similarTable = await getSimilarTable();
  await knex.schema.createTableLike(tableName, similarTable);
  return tableName;
}

async function getItemsByCart(cart: Cart) {
  const foreignTable = cart.itemsTable;
  const table1 = `public."${foreignTable}"`;
  const table2 = "public.item";
  const foreignKey = `${table1}.id`;
  const primaryKey = `${table2}.id`;
  const command = `SELECT * FROM ${table1} INNER JOIN ${table2} ON ${foreignKey} = ${primaryKey}`;
  const data = await sql(command);
  return data;
}

async function getItemsTable(cart: Cart) {
  if (cart.itemsTable) return cart.itemsTable;
  const table = "public.cart";
  const column = "itemsTable";
  const cartIdMatches = { id: cart.id };
  const data = await knex.table(table).select(column).where(cartIdMatches);
  const itemsTable = data[0].itemsTable;
  return itemsTable;
}

async function getSimilarTable() {
  const table = "public.cart";
  const carts = await knex.table(table).select().limit(1);
  const similarTable = carts[0].itemsTable;
  return similarTable;
}

async function removeItemFromCart(cart: Cart, item: Item) {
  validateCart(cart);
  validateItem(item);
  const table = "public.cart";
  const cartIdMatches = { id: cart?.id };
  await knex.table(table).update(cart).where(cartIdMatches);

  const itemsTable = cart.itemsTable;
  const itemIdMatches = { id: item?.id };

  await knex.table(itemsTable).where(itemIdMatches).delete();

  const result = await getCartById(cart?.id);
  return result;
}

async function setCart(cart: Cart, items: Item[]) {
  const cartTable = "public.cart";
  const cartIdMatches = { id: cart.id };
  let result = await knex.table(cartTable).update(cart).where(cartIdMatches);

  const itemsTable = cart.itemsTable;
  for (let item of items) {
    const itemIdMatches = { id: item.id };
    const validValues = getValidValues({ item }).item;
    try {
      result = await knex.table(itemsTable).insert(validValues);
    } catch (itemAlreadyInTable) {
      result = await knex
        .table(itemsTable)
        .update(validValues)
        .where(itemIdMatches);
    }
  }
  return "SUCCESS: cart updated";
}

async function updateCart(cart: Cart, item: Item) {
  const table = "cart";
  const cartIdMatches = { id: cart.id };
  await knex.table(table).update(cart).where(cartIdMatches);

  const itemsTable = cart.itemsTable;
  const itemID = item.id;
  const itemIdMatches = { id: itemID };
  try {
    await knex.table(itemsTable).insert(item);
  } catch (itemAlreadyInCart) {
    await knex.table(itemsTable).update(item).where(itemIdMatches);
  }

  const result = await getCartById(cart.id);
  return result;
}
