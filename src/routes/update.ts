import config, { KnexConfig } from "../../knexfile";
import Knex from "knex";
// import { omit, filter } from "lodash";
import { getValidValues } from "../utilityFunctionsServer";
import { Request, Response } from "express";
// import { getCartById, updateCart } from "../controllers/cartUtils";
import {
  getCartByToken,
  getCartByUser,
  getItemsTable,
  updateCart,
  setCart,
} from "../controllers/cartUtils";
// import validate from "../middleware/validate";
import { validateCart } from "../controllers/validateUtils";
import { handleAsyncError } from "../utils/errorUtils";
import { Cart, User } from "../models/types";
import { getCartId, getUserByToken } from "../controllers/userUtils";

// const knex = getKnex(config, Knex);
const knex = Knex(config);
// const cartData = updateData("cart");
const inventoryData = updateData("inventory");

export default { idKey, cartData, inventoryData, updateData };

async function idKey(request: Request, response: Response) {
  try {
    const { table, id, ...data } = request.body;
    await knex.table(table).update(data).where("id", "=", id);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

function updateData(route: string) {
  let mainTable: string;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request: Request, response: Response) {
    try {
      const data = getValidValues(request.body);
      await knex.table(mainTable).update(data[mainTable]);

      const itemsTable = data[mainTable].itemsTable;
      const itemID = data["item"].itemID;
      await knex
        .table(itemsTable)
        .update(data["item"])
        .where("itemID", "=", itemID);

      let result = {};
      result[mainTable] = await knex.table(mainTable).select();
      result[itemsTable] = await knex.table(itemsTable).select();
      response.status(200).send(result);
    } catch (error) {
      debugger;
      response.status(400).send(error.message);
    }
  };
}

async function cartData(request: Request, response: Response) {
  try {
    const validValues = getValidValues(request.body);
    // const table = "cart";
    const user: User = validValues.user;
    const cart: Cart = validValues.cart;
    // const originalUser: User = await getUserByToken(user.email, user.token);
    // const originalCart: Cart = await getCartByUser(originalUser);
    // cart.itemsTable = originalCart?.itemsTable;
    cart.id = await getCartId(user);
    cart.itemsTable = await getItemsTable(cart);
    // const cartIdMatches = { id: cart.id };
    // // await validate.cart(cart, user);
    // await validateCart(cart, user);
    // await knex.table(table).update(cart).where(cartIdMatches);

    // const itemsTable = (await getCartById(cart.id)).itemsTable;
    // const itemID = item.id;
    // const columnsMatchValues = { id: itemID };
    // await knex.table(itemsTable).update(item).where(columnsMatchValues);
    let result: any;
    const item = validValues.item;
    const items = request?.body?.cart?.items;
    if (item) result = await updateCart(cart, item);
    else if (items) result = await setCart(cart, items);
    // const result = getCartById(cart.id);
    response.status(200).send(result);
  } catch (asyncError) {
    const { error, message, code } = await handleAsyncError(asyncError);
    // debugger;
    // const error = await asyncError;
    response.status(code).send(message);
  }
}

// function toValidValues(value, property, object) {
//   debugger;
// }

// function getKnex(config: KnexConfig, knex: any) {
//   switch (config.mode) {
//     case "development":
//       return knex(config.development);
//     case "production":
//       return knex(config.remote);
//   }
// }
