import config, { KnexConfig } from "../../knexfile";
import Knex from "knex";
// import { updateData } from "./update";
import { getValidValues } from "../utilityFunctionsServer";
import { NextFunction, Request, Response } from "express";
import { hash } from "../utils/utilityFunctions";
import authenticate from "../controllers/authenticate";
import { getCartById } from "../controllers/cartUtils";

// const cartData = createData("cart");
const inventoryData = createData("inventory");

export default { manualData, cartData, inventoryData };

// const knex = getKnex(config, Knex);
const knex = Knex(config);

function createData(route: string) {
  let mainTable: string;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request: Request, response: Response) {
    try {
      const validValues = getValidValues(request.body);
      const tableData = validValues[mainTable];
      const itemData = validValues["item"];
      let itemsTable = tableData.itemsTable;
      // let itemsTable = data[mainTable].itemsTable;
      // const itemsTable = request.body[mainTable].itemsTable;
      if (!itemsTable || itemsTable === "") {
        const email = request.body.user.email;
        const emailHash = hash(email);
        // tableData.itemsTable = emailHash;
        // data[mainTable].itemsTable = emailHash;
        itemsTable = emailHash;
        // throw new Error(`Invalid itemsTable "${itemsTable}"`);
      }
      await authenticate.itemsTable(itemsTable);
      try {
        await knex.table(mainTable).insert(tableData);
      } catch (dataAlreadyExists) {
        await knex.table(mainTable).update(tableData);
      }

      try {
        await knex.table(itemsTable).insert(itemData);
      } catch (dataAlreadyExists) {
        await knex.table(itemsTable).update(itemData);
      }

      let result = {};
      result[mainTable] = await knex.table(mainTable).select();
      result[itemsTable] = await knex.table(itemsTable).select();
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}

async function cartData(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const validValues = getValidValues(request.body);
    const cart = validValues.cart;
    if (!cart) return next();

    const table = "cart";
    try {
      await knex.table(table).insert(cart);
    } catch (dataAlreadyExists) {
      await knex.table(table).update(cart);
    }

    const item = validValues.item;
    // const itemsTable = await getItemsTable(cart.id);
    const itemsTable = (await getCartById(cart.id)).itemsTable;
    try {
      await knex.table(itemsTable).insert(item);
    } catch (dataAlreadyExists) {
      await knex.table(itemsTable).update(item);
    }

    // let result = {} as any;
    // result.cart = await knex.table(table).select();
    // result[itemsTable] = await knex.table(itemsTable).select();
    const result = await getCartById(cart.id);
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function getItemsTable(cartID: number) {
  try {
    const table = "cart";
    const columnsMatchValues = { id: cartID };
    const data = await knex.table(table).select().where(columnsMatchValues);
    const itemsTable = data[0].itemsTable;
    return itemsTable;
  } catch (error) {
    debugger;
  }
}

async function manualData(request: Request, response: Response) {
  try {
    const { table, ...data } = request.body;
    await knex.insert(data).table(table);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
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
