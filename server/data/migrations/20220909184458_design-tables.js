module.exports = { up, down };

async function up(table) {
  return table.schema.createTable("item", function (row) {
    row.integer("id").primary();
    row.string("name");
    row.float("price");
    row.string("image");
    row.string("description");
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
  return table.schema.dropTable("item");
  // return table.schema.dropTable("codexStudent").dropTable("mentor");
}
