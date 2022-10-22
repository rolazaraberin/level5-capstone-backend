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
      // row.integer("id").primary();
      column.integer("userID");
      column.integer("itemID");
      column.integer("quantity");
    });
  // .createTable("mentor", function (row) {
  //   row.integer("id").primary();
  //   row.string("name");
  // })
  // .createTable("codexStudent", function (table) {
  //   table.increments("id").primary();
  //   table.string("name");
  //   table.integer("level");
  //   table.integer("mentor").references("id").inTable("mentor");
  //   // table.integer("mentor");
  //   // table.foreign("mentor").references("mentor.id");
  //   // table.foreign("mentor").references("id").inTable("mentor");
  //   // table.integer("mentor").references("mentor.id");
  // });
}

async function down(table) {
  return table.schema.dropTable("item").dropTable("cart");
  // return table.schema.dropTable("codexStudent").dropTable("mentor");
}
