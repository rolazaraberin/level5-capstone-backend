module.exports = { seed };

// export async function seed(knex) {
async function seed(knex) {
  // Deletes ALL existing entries
  await knex("item").delete();

  // Inserts seed entries
  await knex("item").insert([
    {
      // id: 1,
      name: "Laptop",
      price: 1000,
      image:
        "https://www.weboo.co/wp-content/uploads/2021/07/HUAWEI-MateBook-X-Pro-13.9in-i7-16GB-1TB-Laptop-Green-1599.99-at-Argos-Weboo.jpeg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed felis eget velit aliquet.",
    },
    {
      // id: 2,
      name: "Case",
      price: 30,
      image:
        "http://targus.com/content/images/thumbs/0017693_orbus-hardsided-laptop-case-133-thin-and-light.jpeg",
      description:
        "Eget felis eget nunc lobortis mattis aliquam faucibus purus. Facilisi etiam dignissim diam quis enim lobortis scelerisque.",
    },
    {
      // id: 3,
      name: "Charger",
      price: 15,
      image:
        "https://i5.walmartimages.com/asr/60e28aac-8fe8-4f24-b539-1cbf68ef79e2.33cd40cfd54c54bbe20bfb9450049538.jpeg",
      description:
        "Ornare suspendisse sed nisi lacus sed. Bibendum neque egestas congue quisque.",
    },
    {
      // id: 4,
      name: "Stylus",
      price: 35,
      image:
        "https://images.esellerpro.com/2660/I/298/000/61rNYZmY9XL._SL1500_....jpg",
      description:
        "Dui sapien eget mi proin sed libero. Tristique et egestas quis ipsum suspendisse ultrices.",
    },
    {
      // id: 5,
      name: "Mouse",
      price: 10,
      image:
        "https://image.made-in-china.com/2f0j00CstfOyJnwDoh/Rechargeable-2-4G-Optical-Cordless-Mice-Wireless-Bluetooth-Mouse-with-USB-Nano-Receiver-for-PC-Laptop-Computer-Parts.jpg",
      description:
        "Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus.",
    },
    {
      // id: 6,
      name: "Keyboard",
      price: 15,
      image:
        "https://www.bhphotovideo.com/images/images2500x2500/hp_h6r56aa_aba_k3500_wireless_keyboard_1085780.jpg",
      description:
        "Consectetur lorem donec massa sapien faucibus. Ut ornare lectus sit amet est placerat in.",
    },
  ]);

  await knex("inventory").delete();

  await knex("inventory").insert([
    {
      itemsTable: "inventoryItems",
      totalQuantity: 30,
      totalPrice: 5525,
    },
  ]);

  await knex("inventoryItems").delete();

  await knex("inventoryItems").insert([
    { itemID: 1, quantity: 5, subtotal: 5000 },
    { itemID: 2, quantity: 5, subtotal: 150 },
    { itemID: 3, quantity: 5, subtotal: 75 },
    { itemID: 4, quantity: 5, subtotal: 175 },
    { itemID: 5, quantity: 5, subtotal: 50 },
    { itemID: 6, quantity: 5, subtotal: 75 },
  ]);

  await knex("cart").delete();

  await knex("cart").insert([
    { itemsTable: "cartItems", totalQuantity: 5, totalPrice: 1045 },
  ]);

  await knex("cartItems").delete();

  await knex("cartItems").insert([
    { itemID: 1, quantity: 1, subtotal: 1000 },
    { itemID: 3, quantity: 1, subtotal: 15 },
    { itemID: 5, quantity: 3, subtotal: 30 },
  ]);
}
