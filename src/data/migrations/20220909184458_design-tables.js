module.exports = { up, down };

async function up(table) {
  return table.schema
    .createTable("item", function (column) {
      // row.integer("id").primary();
      column.increments("id").primary();
      column.string("name");
      column.float("price");
      column.string("image");
      column.string("description");
    })
    .createTable("cart", function (column) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.string("itemsTable").primary();
      column.integer("totalQuantity");
      column.integer("totalPrice");
      // column.integer("itemID");
      // column.integer("userID");
    })
    .createTable("cartItems", function (column) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.integer("itemID").primary();
      column.integer("quantity");
      column.integer("price");
      column.integer("subtotal");
      // column.integer("itemID");
      // column.integer("userID");
    })
    .createTable("inventory", function (column) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.string("itemsTable").primary();
      column.integer("totalQuantity");
      column.integer("totalPrice");
      // column.integer("itemID");
      // column.integer("userID");
    })
    .createTable("inventoryItems", function (column) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.integer("itemID").primary();
      column.integer("quantity");
      column.integer("subtotal");
      // column.integer("itemID");
      // column.integer("userID");
    });
}

async function down(table) {
  return table.schema
    .dropTable("item")
    .dropTable("cart")
    .dropTable("cartItems")
    .dropTable("inventory")
    .dropTable("inventoryItems");
}
