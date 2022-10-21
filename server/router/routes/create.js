const config = require("../../../knexfile");
const _knex = require("knex");
module.exports = apiCreate;

// const knex = _knex(config.development);
const knex = _knex(config.remote);

async function apiCreate(request, response) {
  try {
    const { table, ...data } = request.body;
    await knex.insert(data).table(table);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}
