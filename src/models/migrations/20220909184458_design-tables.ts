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
    .raw("CREATE INDEX itemIndex ON item ( name, description, price )")
    .raw(
      `CREATE TABLE "cart" (
      "id" INTEGER,
      "itemsTable" TEXT,
      "totalQuantity" INTEGER,
      "totalPrice" INTEGER,
      PRIMARY KEY ("id")
      );`
    )
    .raw(
      `CREATE TABLE "cartItems1" (
      "id" INTEGER,
      "itemID" INTEGER,
      "quantity" INTEGER,
      "subtotal" INTEGER,
      PRIMARY KEY ("id"),
      FOREIGN KEY ("id") REFERENCES item("id")
    );`
    )
    .createTable("cartItems2", function (column: any) {
      column.integer("id").primary().notNullable();
      column.integer("itemID");
      column.integer("quantity");
      column.integer("subtotal");
      column.foreign("id");
      column.foreign("itemID");
    })
    .createTable("inventory", function (column: any) {
      //TODO: CREATE NEW INVENTORY TABLE PER SELLER

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
    .dropTable("cart")
    .dropTable("cartItems1")
    .dropTable("cartItems2")
    .dropTable("item")
    .dropTable("inventory")
    .dropTable("inventoryItems");
}
