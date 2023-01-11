import express from "express";
import urlHome from "./home";
import create from "./create";
import read from "./read";
import update from "./update";
import del from "./delete";

//ROUTING - http://expressjs.com/en/guide/routing.html

const URL = {
  baseUrl: "/",
  api: "/api",
  cart: "/api/cart",
  inventory: "/api/inventory",
};

const router = express.Router();
router.get(URL.baseUrl, urlHome);

router.post(URL.api, create.manualData);
router.get(URL.api, read.allData);
router.put(URL.api, update.idKey);
router.delete(URL.api, del.manualData);

router.post(URL.cart, create.cartData);
router.get(URL.cart, read.cartData);
router.put(URL.cart, update.cartData);
router.delete(URL.cart, del.cartData);

router.post(URL.inventory, create.inventoryData);
router.get(URL.inventory, read.inventoryData);
router.put(URL.inventory, update.inventoryData);
router.put(URL.inventory, del.inventoryData);

export default router;
