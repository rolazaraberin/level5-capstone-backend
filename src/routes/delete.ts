import config, { KnexConfig } from "../../knexfile";
import Knex from "knex";
import { getValidValues } from "../utilityFunctionsServer";
import { Request, Response } from "express";
import { getCartById } from "../controllers/cartUtils";

// const knex = getKnex(config, Knex);
const knex = Knex(config);

// const cartData = deleteData("cart");
const inventoryData = deleteData("inventory");
export default { manualData, cartData, inventoryData };

async function manualData(request: Request, response: Response) {
  try {
    const { table, ...data } = request.body;
    const column = Object.getOwnPropertyNames(data)[0];
    const value = data[column];
    await knex.table(table).where(column, "=", value).delete();
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

function deleteData(route: string) {
  let mainTable: string;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request: Request, response: Response) {
    try {
      // const table = "inventory";
      // const { itemID, ...data } = request.body;
      const data = getValidValues(request.body);
      await knex.table(mainTable).update(data[mainTable]);
      const itemsTable = data[mainTable].itemsTable;
      const itemID = data.item.itemID;
      await knex.table(itemsTable).where("itemID", "=", itemID).delete();

      const result = {};
      result[mainTable] = await knex.table(mainTable).select();
      result[itemsTable] = await knex.table(itemsTable).select();
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}

async function cartData(request: Request, response: Response) {
  try {
    // const { itemID, ...data } = request.body;
    const validValues = getValidValues(request.body);
    // const cart = await cartUtils.get(cartID);
    const cart = validValues.cart;
    // const item = validValues.item;
    const table = "public.cart";
    await knex.table(table).update(cart);

    const cartID = validValues.cart.id;
    const itemsTable = (await getCartById(cartID)).itemsTable;
    const itemID = validValues.item.id;
    const columnsMatchValues = { id: itemID };
    //"itemID", "=", itemID
    await knex.table(itemsTable).where(columnsMatchValues).delete();

    const result = await getCartById(cartID);
    // const result = {} as any;
    // result.cart = await knex.table(table).select();
    // result[itemsTable] = await knex.table(itemsTable).select();
    response.status(200).send(result);
  } catch (error) {
    debugger;
    response.status(400).send(error.message);
  }
}

function getKnex(config: KnexConfig, knex: any) {
  switch (config.mode) {
    case "development":
      return knex(config.development);
    case "production":
      return knex(config.remote);
  }
}
