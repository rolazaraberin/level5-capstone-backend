import { User } from "../models/types";
import { knex, sql } from "../models/database";
import { getUserByToken } from "./userUtils";
import { Cart, Item } from "../models/types";
import { getValidValues } from "../utilityFunctionsServer";

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
// export default cartUtils;

async function getCartById(cartID: number) {
  try {
    const table = "public.cart";
    // let idColumn = "id";
    // sql = `SELECT * FROM ${table} WHERE ${idColumn} = ${account.cartID}`;
    // data = await runRaw(sql);
    // account.cart = data[0];

    // table = "cart";
    const columnsMatchValues = { id: cartID };
    const data = await knex.table(table).select().where(columnsMatchValues);
    const cart: Cart = data[0];
    if (cart) cart.items = await getItemsByCart(cart);
    return cart;
  } catch (error) {
    debugger;
  }
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
  const command = `SELECT MAX(id) FROM ${table}`;
  const data = await sql(command);
  const lastId = Number(data[0].max);
  const id = lastId + 1;
  const itemsTable = await createItemsTableById(id);
  const cart: Cart = { id, itemsTable };
  await knex.table(table).insert(cart);
  return id;
}

async function createItemsTableById(id: number) {
  const tableName = "cartItems" + id;
  const likeTable = "cartItems1";
  await knex.schema.createTableLike(tableName, likeTable);
  return tableName;
}

async function getItemsByCart(cart: Cart) {
  const foreignKey1 = cart.itemsTable;
  const table1 = `public."${foreignKey1}"`;
  const table2 = "public.item";
  const primaryKey1 = `${table1}.id`;
  const primaryKey2 = `${table2}.id`;
  const command = `SELECT * FROM ${table1} INNER JOIN ${table2} ON ${primaryKey1} = ${primaryKey2}`;
  const data = await sql(command);
  // const columnsMatchValues = {} as any;
  // columnsMatchValues[`${primaryKey1}`] = primaryKey2;
  // const data = await knex
  //   .table(table)
  //   .select()
  //   .join(table2, columnsMatchValues);
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

async function removeItemFromCart(cart: Cart, item: Item) {
  const table = "public.cart";
  const cartIdMatches = { id: cart.id };
  await knex.table(table).update(cart).where(cartIdMatches);

  // const cartID = validValues.cart.id;
  // const cart: Cart = await getCartById(cartID);
  const itemsTable = cart.itemsTable;
  const itemId = item.id;
  const itemIdMatches = { id: itemId };
  //"itemID", "=", itemID
  await knex.table(itemsTable).where(itemIdMatches).delete();

  const result = await getCartById(cart.id);
  return result;
}

async function setCart(cart: Cart, items: Item[]) {
  const cartTable = "public.cart";
  const cartIdMatches = { id: cart.id };
  let result = await knex.table(cartTable).update(cart).where(cartIdMatches);

  // const items = cart.items;
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

  // cart = await getCartById(cart.id);
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
