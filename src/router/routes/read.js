const config = require("../../../knexfile");
const _knex = require("knex");

const cartData = readData("cart");
const inventoryData = readData("inventory");
module.exports = { allData, cartData, inventoryData };

// const knex = _knex(config.development);
const knex = _knex(config.remote);
const replacer = undefined;
const spacer = " ";

async function allData(_request, response) {
  try {
    // const data = await knex.select().from("item");
    const item = await knex.select().from("item");
    const inventory = await knex.select().from("inventory");
    const cart = await knex.select().from("cart");
    // const data = JSON.stringify({ students, mentors }, replacer, spacer);
    // const data = JSON.stringify({ items }, replacer, spacer);
    const data = JSON.stringify({ item, inventory, cart }, replacer, spacer);
    // const message = "Use Postman to send POST, PUT, and DELETE requests to this API";
    response.type("text");
    response.status(200).send(data);
    // response.status(200).send([message, data].join("\n"));
  } catch (error) {
    response.status(400).send(error);
  }
}

// async function cartData(request, response) {
//   try {
//     // const data = await knex.select().from("item");
//     // const items = await knex.select().from("item");
//     // const cart = await knex.select().from("cart");
//     const table = "cart";
//     const cart = await knex.select().from(table);
//     const itemsTable = "cartItemsTable";
//     const items = await knex
//       .select()
//       .from(cart.items)
//       .leftJoin("item", `${items}.item`, "item.id");
//     // const data = JSON.stringify({ students, mentors }, replacer, spacer);
//     // const data = JSON.stringify({ items }, replacer, spacer);
//     // const data = JSON.stringify({ items, cart }, replacer, spacer);
//     // const message = "Use Postman to send POST, PUT, and DELETE requests to this API";
//     // response.type("text");
//     response.status(200).send(data);
//     // response.status(200).send([message, data].join("\n"));
//   } catch (error) {
//     response.status(400).send(error);
//   }
// }

// async function inventoryData(_request, response) {
//   try {
//     // const data = await knex.select().from("item");
//     // const items = await knex.select().from("item");
//     // const cart = await knex.select().from("cart");
//     const data = await knex
//       .select()
//       .from("inventory")
//       .leftJoin("item", "inventory.itemID", "item.id");
//     // const data = JSON.stringify({ students, mentors }, replacer, spacer);
//     // const data = JSON.stringify({ items }, replacer, spacer);
//     // const data = JSON.stringify({ items, cart }, replacer, spacer);
//     // const message = "Use Postman to send POST, PUT, and DELETE requests to this API";
//     response.type("text");
//     response.status(200).send(data);
//     // response.status(200).send([message, data].join("\n"));
//   } catch (error) {
//     response.status(400).send(error);
//   }
// }

function readData(tableString) {
  return async function (_request, response) {
    try {
      const table = tableString;
      const tableData = await knex.select().from(table);
      // const itemsTable = `${table}ItemsTable`;
      const itemsTable = tableData[0].itemsTable;
      const items = await knex
        .select()
        .from(itemsTable)
        .leftJoin("item", `${itemsTable}.itemID`, "item.id");
      const data = { ...tableData[0], items };
      response.status(200).send(data);
    } catch (error) {
      response.status(400).send(error);
    }
  };
}
