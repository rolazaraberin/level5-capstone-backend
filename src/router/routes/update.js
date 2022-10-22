const config = require("../../../knexfile");
const _knex = require("knex");
module.exports = apiUpdate;

// const knex = _knex(config.development);
const knex = _knex(config.remote);

async function apiUpdate(request, response) {
  try {
    const { table, id, ...data } = request.body;
    await knex.table(table).update(data).where("id", "=", id);
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}
