// export default { up, down };

export async function up(table: any) {
  return await table.schema
    .createTable("item", function (column: any) {
      column.increments("id").primary().notNullable();
      column.string("name");
      column.float("price");
      column.string("image");
      column.string("description");
    })
    .createTable("cart", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.increments("id").primary().notNullable();
      column.string("itemsTable");
      column.integer("totalQuantity");
      column.integer("totalPrice");
      column.foreign("itemsTable");
    })
    .createTable("cartItems1", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.integer("id").primary().notNullable();
      column.integer("itemID");
      column.integer("quantity");
      column.integer("subtotal");
      column.foreign("id");
      column.foreign("itemID");
    })
    .createTable("inventory", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.increments("id").primary().notNullable();
      column.string("itemsTable");
      column.integer("totalQuantity");
      column.integer("totalPrice");
      column.foreign("itemsTable");
    })
    .createTable("inventoryItems", function (column: any) {
      column.integer("id").primary().notNullable();
      column.integer("itemID");
      column.integer("quantity");
      column.integer("subtotal");
      column.foreign("id");
      column.foreign("itemID");
    });
}

export async function down(table: any) {
  return table.schema
    .dropTable("item")
    .dropTable("cart")
    .dropTable("cartItems1")
    .dropTable("inventory")
    .dropTable("inventoryItems");
}
