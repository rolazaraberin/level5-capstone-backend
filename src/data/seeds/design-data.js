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
    {
      name: "Laptop",
      price: 1000,
      image:
        "https://www.weboo.co/wp-content/uploads/2021/07/HUAWEI-MateBook-X-Pro-13.9in-i7-16GB-1TB-Laptop-Green-1599.99-at-Argos-Weboo.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet.",
    },
    {
      name: "Case",
      price: 30,
      image:
        "http://targus.com/content/images/thumbs/0017693_orbus-hardsided-laptop-case-133-thin-and-light.jpeg",
      description:
        "Eget felis eget nunc lobortis mattis aliquam faucibus purus. Facilisi etiam dignissim diam quis enim lobortis scelerisque.",
    },
    {
      name: "Charger",
      price: 15,
      image:
        "https://i5.walmartimages.com/asr/60e28aac-8fe8-4f24-b539-1cbf68ef79e2.33cd40cfd54c54bbe20bfb9450049538.jpeg",
      description:
        "Ornare suspendisse sed nisi lacus sed. Bibendum neque egestas congue quisque.",
    },
    {
      name: "Stylus",
      price: 35,
      image:
        "https://images.esellerpro.com/2660/I/298/000/61rNYZmY9XL._SL1500_....jpg",
      description:
        "Dui sapien eget mi proin sed libero. Tristique et egestas quis ipsum suspendisse ultrices.",
    },
    {
      name: "Mouse",
      price: 10,
      image:
        "https://image.made-in-china.com/2f0j00CstfOyJnwDoh/Rechargeable-2-4G-Optical-Cordless-Mice-Wireless-Bluetooth-Mouse-with-USB-Nano-Receiver-for-PC-Laptop-Computer-Parts.jpg",
      description:
        "Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus.",
    },
    {
      name: "Keyboard",
      price: 15,
      image:
        "https://www.bhphotovideo.com/images/images2500x2500/hp_h6r56aa_aba_k3500_wireless_keyboard_1085780.jpg",
      description:
        "Consectetur lorem donec massa sapien faucibus. Ut ornare lectus sit amet est placerat in.",
    },
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
