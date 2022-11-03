const express = require("express");
const urlHome = require("./routes/home");
const create = require("./routes/create");
const read = require("./routes/read");
const update = require("./routes/update");
const del = require("./routes/delete");

//ROUTING - http://expressjs.com/en/guide/routing.html

const URL = {
  baseUrl: "/",
  api: "/api",
  cart: "/api/cart",
  inventory: "/api/inventory",
};

const router = express.Router();
router.get(URL.baseUrl, urlHome);

router.get(URL.api, read.manualData);
router.post(URL.api, create.manualData);
router.put(URL.api, update.idKey);
router.delete(URL.api, del.idKey);

router.post(URL.cart, create.cartData);
router.get(URL.cart, read.cartData);
router.put(URL.cart, update.cartData);
router.delete(URL.cart, del.cartData);

router.post(URL.inventory, create.inventoryData);
router.get(URL.inventory, read.inventoryData);
router.put(URL.inventory, update.inventoryData);
router.put(URL.inventory, del.inventoryData);

module.exports = router;
