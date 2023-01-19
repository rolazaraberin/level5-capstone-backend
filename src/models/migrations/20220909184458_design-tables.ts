// export default { up, down };

export async function up(table: any) {
  return table.schema
    .createTable("item", function (column: any) {
      column.increments("id").primary().notNullable();
      column.string("name");
      column.float("price");
      column.string("image");
      column.string("description");
    })
    .createTable("cart", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.string("itemsTable").primary().notNullable();
      column.integer("totalQuantity");
      column.integer("totalPrice");
    })
    .createTable("cartItems", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.integer("itemID").primary().notNullable();
      column.integer("quantity");
      column.integer("subtotal");
    })
    .createTable("inventory", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.string("itemsTable").primary().notNullable();
      column.integer("totalQuantity");
      column.integer("totalPrice");
    })
    .createTable("inventoryItems", function (column: any) {
      //TODO: CREATE NEW CART TABLE PER USER

      column.integer("itemID").primary().notNullable();
      column.integer("quantity");
      column.integer("subtotal");
    })
    .createTable("user", function (column: any) {
      column.increments("id").primary().notNullable();
      column.string("name");
      column.string("email");
    })
    .createTable("login", function (column: any) {
      column.string("emailHash").primary().notNullable();
      column.string("passwordHash");
      column.string("token");
      column.string("userID");
      column.foreign("userID").references("user");
      // column.foreign("userid").references("user").deferrable("deferred");
    });
}

export async function down(table: any) {
  return table.schema
    .dropTable("item")
    .dropTable("cart")
    .dropTable("cartItems")
    .dropTable("inventory")
    .dropTable("inventoryItems")
    .dropTable("user")
    .dropTable("login");
}
