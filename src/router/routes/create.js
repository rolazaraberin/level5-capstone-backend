const config = require("../../../knexfile");
const _knex = require("knex");
const { updateData } = require("./update");
const { getValidValues } = require("../../utilityFunctionsServer");

const cartData = createData("cart");
const inventoryData = createData("inventory");

module.exports = { manualData, cartData, inventoryData };

const knex = getKnex(config, _knex);

function createData(route) {
  let mainTable;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request, response) {
    // const data = request.body;
    // const data = getValidValues(request.body, tableString);
    // const tableData = getValidValues(request.body[mainTable], validValues);
    // const data = getValidValues(request.body, validValues);
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

async function manualData(request, response) {
  try {
    const { table, ...data } = request.body;
    await knex.insert(data).table(table);
    result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

function getKnex(config, knex) {
  switch (config.mode) {
    case "development":
      return knex(config.development);
    case "production":
      return knex(config.remote);
  }
}
