const _knex = require("knex");
const config = require("../../../knexfile");
module.exports = { urlQuery1, urlQuery2, urlQuery3 };

const knex = _knex(config.development);
const replacer = undefined;
const spacer = " ";

async function urlQuery1(_request, response) {
  const mentors = await knex.select().from("mentor");
  const students = await knex.select().from("codexStudent");
  const message = { mentors, students };
  response.type("text");
  response.send(JSON.stringify(message, replacer, spacer));
}
async function urlQuery2(_request, response) {
  const mentors = await knex.select().from("mentor");
  const message = { mentors };
  response.type("text");
  response.send(JSON.stringify(message, replacer, spacer));
}
async function urlQuery3(_request, response) {
  const students = await knex.select().from("codexStudent");
  const message = { students };
  response.type("text");
  response.send(JSON.stringify(message, replacer, spacer));
}
