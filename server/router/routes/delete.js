const config = require("../../../knexfile");
const _knex = require("knex");
module.exports = apiDelete;

const knex = _knex(config.development);

async function apiDelete(request, response) {
  try {
    const { table, id } = request.body;
    await knex.table(table).where("id", "=", id).delete();
    const result = await knex.table(table).select();
    response.status(200).send(result);
  } catch (error) {
    response.status(400).send(error.message);
  }
}
