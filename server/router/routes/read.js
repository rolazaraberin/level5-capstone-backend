const config = require("../../../knexfile");
const _knex = require("knex");
module.exports = apiRead;

const knex = _knex(config.development);
const replacer = undefined;
const spacer = " ";

async function apiRead(_request, response) {
  try {
    // const mentors = await knex.table("mentor").select();
    // const students = await knex.select().from("codexStudent");
    const items = await knex.select().from("item");
    // const data = JSON.stringify({ students, mentors }, replacer, spacer);
    const data = JSON.stringify({ items }, replacer, spacer);
    const message =
      "Use Postman to send POST, PUT, and DELETE requests to this API";
    response.type("text");
    response.status(200).send([message, data].join("\n"));
  } catch (error) {
    response.status(400).send(error);
  }
}
