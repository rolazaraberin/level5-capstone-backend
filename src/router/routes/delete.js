const config = require("../../../knexfile");
const _knex = require("knex");
const { getValidValues } = require("../../utilityFunctionsServer");

// const knex = _knex(config.development);
const knex = _knex(config.remote);

const cartData = deleteData("cart");
const inventoryData = deleteData("inventory");
module.exports = { idKey, cartData, inventoryData };

async function idKey(request, response) {
  try {
    const { table, id } = request.body;
    await knex.table(table).where("id", "=", id).delete();
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

function deleteData(route) {
  let mainTable;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (request, response) {
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
