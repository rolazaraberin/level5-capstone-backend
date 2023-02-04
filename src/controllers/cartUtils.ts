import { knex } from "../models/database";
import { getUserByToken } from "./userUtils";

export { getCartById, getCartByToken };
// export default cartUtils;

async function getCartById(cartID: number) {
  try {
    let table = "public.cart";
    // let idColumn = "id";
    // sql = `SELECT * FROM ${table} WHERE ${idColumn} = ${account.cartID}`;
    // data = await runRaw(sql);
    // account.cart = data[0];

    // table = "cart";
    let columnsMatchValues = { id: cartID };
    let data = await knex.table(table).select().where(columnsMatchValues);
    const cart = data[0];

    table = `public.${cart.itemsTable}`;
    const table2 = "public.item";
    const idColumn = `${table}.id`;
    const idColumn2 = `${table2}.id`;
    columnsMatchValues = {} as any;
    columnsMatchValues[`${idColumn}`] = idColumn2;
    // sql = `SELECT * FROM ${table} JOIN ${table2} ON ${idColumn} = ${idColumn2}`;
    // data = await runRaw(sql);
    data = await knex.table(table).select().join(table2, columnsMatchValues);
    cart.items = data;

    return cart;
  } catch (error) {
    debugger;
  }
}

async function getCartByToken(email: string, token: string) {
  const user = await getUserByToken(email, token);
  return await getCartById(user.cartID);
}
