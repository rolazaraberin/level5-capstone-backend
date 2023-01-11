const config = require("../../../knexfile");
const _knex = require("knex");
const { omit, filter } = require("lodash");
const { getValidValues } = require("../../utilityFunctionsServer");

const knex = getKnex(config, _knex);
const cartData = updateData("cart");
const inventoryData = updateData("inventory");

module.exports = { idKey, cartData, inventoryData, updateData };

async function idKey(request, response) {
  try {
    const { table, id, ...data } = request.body;
    await knex.table(table).update(data).where("id", "=", id);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

function updateData(route) {
  let mainTable;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request, response) {
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
      response.status(400).send(error.message);
    }
  };
}

function toValidValues(value, property, object) {
  debugger;
}

function getKnex(config, knex) {
  switch (config.mode) {
    case "development":
      return knex(config.development);
    case "production":
      return knex(config.remote);
  }
}
