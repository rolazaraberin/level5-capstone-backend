module.exports = { seed };

// export async function seed(knex) {
async function seed(knex) {
  // Deletes ALL existing entries
  await knex("item").delete();
  // await knex("codexStudent").delete();
  // await knex("mentor").delete();
  // await knex("codexStudent").whereNotNull("id").delete();
  // await knex("mentor").whereNotNull("id").delete();

  // Inserts seed entries
  await knex("item").insert([
    { name: "laptop", price: 1000 },
    { name: "case", price: 30 },
    { name: "charger", price: 15 },
    { name: "stylus", price: 35 },
    { name: "mouse", price: 10 },
    { name: "keyboard", price: 15 },
    // { id: 1, name: "laptop", price: 1000 },
    // { id: 2, name: "case", price: 30 },
    // { id: 3, name: "charger", price: 15 },
    // { id: 4, name: "stylus", price: 35 },
    // { id: 5, name: "mouse", price: 10 },
    // { id: 6, name: "keyboard", price: 15 },
  ]);
  // await knex("mentor").insert([
  //   { id: 1, name: "Byron" },
  //   { id: 2, name: "Lillian" },
  //   { id: 3, name: "Chuks" },
  //   { id: 4, name: "JR" },
  //   { id: 5, name: "Josue" },
  //   { id: 6, name: "Steve" },
  // ]);
  // await knex("codexStudent").insert([
  //   { name: "Rolazar", level: 4, mentor: 1 },
  //   { name: "Doe", level: 2, mentor: 2 },
  //   { name: "John", level: 3, mentor: 3 },
  //   { name: "Jane", level: 2, mentor: 4 },
  //   { name: "Janet", level: 4 },
  //   { name: "Jake", level: 2 },
  // ]);
}
