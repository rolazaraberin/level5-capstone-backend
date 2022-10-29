const config = require("../../../knexfile");
const _knex = require("knex");
const { omit } = require("lodash");

// const knex = _knex(config.development);
const knex = _knex(config.remote);
const cartData = updateData("cart", "itemID");
const inventoryData = updateData("inventory", "itemID");

module.exports = { idKey, cartData, inventoryData };

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

function updateData(tableString, keyString) {
  return async function (request, response) {
    try {
      // const table = "inventory";
      // const { itemID, ...data } = request.body;
      const id = request.body[keyString];
      const data = omit(request.body, keyString);
      await knex.table(tableString).update(data).where(keyString, "=", id);
      const result = await knex.table(tableString).select();
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error.message);
    }
  };
}

// async function cartData(request, response) {
//   try {
//     const table = "cart";
//     const { itemID, ...data } = request.body;
//     await knex.table(table).update(data).where("itemID", "=", itemID);
//     const result = await knex.table(table).select();
//     response.status(200).send(result);
//   } catch (error) {
//     response.status(400).send(error.message);
//   }
// }

// async function inventoryData(request, response) {
//   try {
//     const table = "inventory";
//     const { itemID, ...data } = request.body;
//     await knex.table(table).update(data).where("itemID", "=", itemID);
//     const result = await knex.table(table).select();
//     response.status(200).send(result);
//   } catch (error) {
//     response.status(400).send(error.message);
//   }
// }
