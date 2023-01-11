import config, { KnexConfig } from "../../../knexfile";
import Knex from "knex";
// import { updateData } from "./update";
import { getValidValues } from "../../utilityFunctionsServer";
import { Request, Response } from "express";

const cartData = createData("cart");
const inventoryData = createData("inventory");

export default { manualData, cartData, inventoryData };

const knex = getKnex(config, Knex);

function createData(route: string) {
  let mainTable: string;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request: Request, response: Response) {
    try {
      const data = getValidValues(request.body);
      const itemsTable = request.body[mainTable].itemsTable;
      if (!itemsTable || itemsTable === "")
        throw new Error(`Invalid itemsTable "${itemsTable}"`);

      try {
        await knex.table(mainTable).insert(data[mainTable]);
      } catch (dataAlreadyExists) {
        await knex.table(mainTable).update(data[mainTable]);
      }

      try {
        await knex.table(itemsTable).insert(data["item"]);
      } catch (dataAlreadyExists) {
        await knex.table(itemsTable).update(data["item"]);
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
