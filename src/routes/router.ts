import express from "express";
import urlHome from "./home";
import { testPage } from "./testPage";
import create from "./create";
// import create from "./createTest";
import read from "./read";
import update from "./update";
import del from "./delete";
import logout from "../controllers/logout";
import signup from "../controllers/signup";
import login from "../controllers/login";
import account from "../controllers/account";
import validate from "../middleware/validate";
import api from "../controllers/api";
import dotenv from "dotenv";
dotenv.config();

//ROUTING - http://expressjs.com/en/guide/routing.html

export const hostUrl = process.env.host;
export const url = {
  baseUrl: "/",
  api: "/api",
  cart: "/api/cart",
  inventory: "/api/inventory",
  login: "/api/login",
  logout: "/api/logout",
  signup: "/api/signup",
  account: "/api/account",
  test: "/test",
};
export const fullUrl = {
  host: hostUrl,
  root: hostUrl + url.baseUrl,
  api: hostUrl + url.api,
  cart: hostUrl + url.cart,
  inventory: hostUrl + url.inventory,
  login: hostUrl + url.login,
  logout: hostUrl + url.logout,
  signup: hostUrl + url.signup,
  account: hostUrl + url.account,
  test: hostUrl + url.test,
};

const router = express.Router();
/////////////////////////////
router.post(url.login, login.withToken, login.withPassword);
router.post(url.logout, logout.withToken);
router.post(url.signup, signup.withPassword);
router.post(url.account, account.fetchInfo);
router.delete(url.account, account.delete);

router.post(url.cart, validate.token, read.cartData);
router.put(url.cart, validate.token, update.cartData);
router.delete(url.cart, validate.token, del.cartData);

router.post(url.inventory, create.inventoryData);
router.get(url.inventory, read.inventoryData);
router.put(url.inventory, update.inventoryData);
router.put(url.inventory, del.inventoryData);

router.get(url.baseUrl, urlHome);
router.get(url.test, testPage);
router.post(url.test, testPage);
router.post(url.api, create.manualData);
router.get(url.api, api.ping);
router.put(url.api, update.idKey);
router.delete(url.api, del.manualData);

export default router;
