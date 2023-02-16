import User from "../models/entities/User";
import { knex, sql } from "../models/database";
import { getUserByToken } from "./userUtils";
import { Cart } from "../models/types";

export {
  getCartById,
  getCartByToken,
  getCartByUser,
  deleteCartById,
  createCart,
  getItemsByCart,
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
    const cart = data[0];
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
  await sql.initialize();
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
  const foreignKey1 = `public."${cart.itemsTable}"`;
  const foreignKey2 = "public.item";
  const primaryKey1 = `${foreignKey1}.id`;
  const primaryKey2 = `${foreignKey2}.id`;
  const command = `SELECT * FROM ${foreignKey1} JOIN ${foreignKey2} ON ${primaryKey1} = ${primaryKey2}`;
  const data = await sql(command);
  // const columnsMatchValues = {} as any;
  // columnsMatchValues[`${primaryKey1}`] = primaryKey2;
  // const data = await knex
  //   .table(table)
  //   .select()
  //   .join(table2, columnsMatchValues);
  return data;
}
