import config, { KnexConfig } from "../../../knexfile";
import Knex from "knex";
import { isEmpty } from "lodash";
import { Request, Response } from "express";

const cartData = readData("cart");
const inventoryData = readData("inventory");
export default { manualData, cartData, inventoryData, allData };

const knex = getKnex(config, Knex);
const replacer = undefined;
const spacer = " ";

function readData(route: string) {
  let mainTable: string;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (_request: Request, response: Response) {
    try {
      // result[mainTable] = await knex.select().from(mainTable);
      // let result;
      const data = await knex.table(mainTable).select();
      let result = { ...data[0] };
      const itemsTable = result.itemsTable;
      const items = await knex
        .select()
        .from(itemsTable)
        .leftJoin("item", `${itemsTable}.itemID`, "item.id");
      result = { ...result, items };
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  };
}

async function manualData(request: Request, response: Response) {
  try {
    const { table } = request.body;
    const data = await knex.table(table).select();
    // response.type("text");
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function allData(request: Request, response: Response) {
  if (!isEmpty(request.body)) {
    manualData(request, response);
    return;
  }

  try {
    // const data = await knex.select().from("item");
    const item = await knex.select().from("item");
    const inventory = await knex.select().from("inventory");
    const inventoryItems = await knex.select().from("inventoryItems");
    const cart = await knex.select().from("cart");
    const cartItems = await knex.select().from("cartItems");
    // const data = JSON.stringify({ students, mentors }, replacer, spacer);
    // const data = JSON.stringify({ items }, replacer, spacer);
    const data = JSON.stringify(
      { item, inventory, inventoryItems, cart, cartItems },
      replacer,
      spacer
    );
    // const data = { item, inventory, inventoryItems, cart, cartItems };
    // const message = "Use Postman to send POST, PUT, and DELETE requests to this API";
    response.type("text");
    response.status(200).send(data);
    // response.status(200).send([message, data].join("\n"));
  } catch (error) {
    response.status(400).send(error);
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
