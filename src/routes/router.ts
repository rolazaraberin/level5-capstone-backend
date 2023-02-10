import httpCodes from "../utils/httpCodes";
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

//ROUTING - http://expressjs.com/en/guide/routing.html

const URL = {
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

const router = express.Router();
router.get(URL.baseUrl, urlHome);
router.get(URL.test, testPage);
router.post(URL.test, testPage);
router.post(URL.api, create.manualData);
// router.get(URL.api, read.allData);
router.get(URL.api, api.ping);
router.put(URL.api, update.idKey);
router.delete(URL.api, del.manualData);

router.post(URL.cart, validate.token, create.cartData, read.cartData);
// router.get(URL.cart, validate.token, read.cartData);
router.put(URL.cart, validate.token, update.cartData);
router.delete(URL.cart, validate.token, del.cartData);

router.post(URL.inventory, create.inventoryData);
router.get(URL.inventory, read.inventoryData);
router.put(URL.inventory, update.inventoryData);
router.put(URL.inventory, del.inventoryData);

router.post(URL.login, login.withToken, login.withPassword);
router.post(URL.logout, logout.withToken);
router.post(URL.signup, signup.withPassword);
// router.get(URL.account, account.fetchInfo);
router.post(URL.account, account.fetchInfo);
router.delete(URL.account, account.delete);

export async function handleAsyncError(asyncError: any) {
  const error = await asyncError;
  const message = error.message;
  let code = error.code;
  if (!code || code >= 600) code = httpCodes.error.serverError;
  return { error, code, message };
}

export default router;
