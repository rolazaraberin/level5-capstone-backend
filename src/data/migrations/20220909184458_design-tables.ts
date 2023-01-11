// export default { up, down };

export async function up(table: any) {
  return table.schema
    .createTable("item", function (column: any) {
      // row.integer("id").primary();
      column.increments("id").primary().notNullable();
      column.string("name");
      column.float("price");
      column.string("image");
      column.string("description");
    })
    .createTable("cart", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.string("itemsTable").primary().notNullable();
      column.integer("totalQuantity");
      column.integer("totalPrice");
      // column.integer("itemID");
      // column.integer("userID");
    })
    .createTable("cartItems", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.integer("itemID").primary().notNullable();
      column.integer("quantity");
      column.integer("subtotal");
      // column.integer("itemID");
      // column.integer("userID");
    })
    .createTable("inventory", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.string("itemsTable").primary().notNullable();
      column.integer("totalQuantity");
      column.integer("totalPrice");
      // column.integer("itemID");
      // column.integer("userID");
    })
    .createTable("inventoryItems", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      // row.integer("id").primary();
      // column.increments("id").primary();
      column.integer("itemID").primary().notNullable();
      column.integer("quantity");
      column.integer("subtotal");
      // column.integer("itemID");
      // column.integer("userID");
    });
}

export async function down(table: any) {
  return table.schema
    .dropTable("item")
    .dropTable("cart")
    .dropTable("cartItems")
    .dropTable("inventory")
    .dropTable("inventoryItems");
}
