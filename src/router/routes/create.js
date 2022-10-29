const config = require("../../../knexfile");
const _knex = require("knex");
module.exports = { anyData, cartData, inventoryData };

// const knex = _knex(config.development);
const knex = _knex(config.remote);

async function anyData(request, response) {
  try {
    const { table, ...data } = request.body;
    await knex.insert(data).table(table);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function cartData(request, response) {
  try {
    // const { ...data } = request.body;
    const table = "cart";
    const data = request.body;
    await knex.insert(data).table(table);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function inventoryData(request, response) {
  try {
    // const { ...data } = request.body;
    const table = "inventory";
    const data = request.body;
    await knex.insert(data).table(table);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}
