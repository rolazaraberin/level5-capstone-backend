const config = require("../../../knexfile");
const _knex = require("knex");

// const knex = _knex(config.development);
const knex = _knex(config.remote);

const cartData = deleteData("cart", "itemID");
const inventoryData = deleteData("inventory", "itemID");
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

function deleteData(tableString, keyString) {
  return async function (request, response) {
    try {
      // const table = "inventory";
      // const { itemID, ...data } = request.body;
      const id = request.body[keyString];
      await knex.table(tableString).where(keyString, "=", id).delete();
      const result = await knex.table(tableString).select();
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}
