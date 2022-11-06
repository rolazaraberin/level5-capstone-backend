const config = require("../../../knexfile");
const _knex = require("knex");
const { isEmpty } = require("lodash");

const cartData = readData("cart");
const inventoryData = readData("inventory");
module.exports = { manualData, cartData, inventoryData, allData };

// const knex = _knex(config.development);
const knex = _knex(config.remote);
const replacer = undefined;
const spacer = " ";

function readData(route) {
  let mainTable;
  if (route === "cart") mainTable = "cart";
  if (route === "inventory") mainTable = "inventory";

  return async function (_request, response) {
    try {
      // result[mainTable] = await knex.select().from(mainTable);
      let result;
      const data = await knex.table(mainTable).select();
      result = { ...data[0] };
      const itemsTable = result.itemsTable;
      const items = await knex
        .select()
        .from(itemsTable)
        .leftJoin("item", `${itemsTable}.itemID`, "item.id");
      result = { ...result, items };
      response.status(200).send(result);
    } catch (error) {
      response.status(400).send(error);
    }
  };
}

async function manualData(request, response) {
  try {
    const { table } = request.body;
    const data = await knex.table(table).select();
    // response.type("text");
    response.status(200).send(data);
  } catch (error) {
    response.status(400).send(error.message);
  }
}

async function allData(request, response) {
  if (!isEmpty(request.body)) {
    manualData(request, response);
    return;
  }

  try {
    // const data = await knex.select().from("item");
    const item = await knex.select().from("item");
    const inventory = await knex.select().from("inventory");
    const inventoryItems = await knex.select().from("inventoryItems");
    const cart = await knex.select().from("cart");
    const cartItems = await knex.select().from("cartItems");
    // const data = JSON.stringify({ students, mentors }, replacer, spacer);
    // const data = JSON.stringify({ items }, replacer, spacer);
    const data = JSON.stringify(
      { item, inventory, inventoryItems, cart, cartItems },
      replacer,
      spacer
    );
    // const data = { item, inventory, inventoryItems, cart, cartItems };
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
