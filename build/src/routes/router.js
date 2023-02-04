"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAsyncError = void 0;
const express_1 = __importDefault(require("express"));
const home_1 = __importDefault(require("./home"));
const create_1 = __importDefault(require("./create"));
const read_1 = __importDefault(require("./read"));
const update_1 = __importDefault(require("./update"));
const delete_1 = __importDefault(require("./delete"));
const logout_1 = __importDefault(require("../controllers/logout"));
const signup_1 = __importDefault(require("../controllers/signup"));
const login_1 = __importDefault(require("../controllers/login"));
const account_1 = __importDefault(require("../controllers/account"));
const httpCodes_1 = __importDefault(require("../utils/httpCodes"));
const validate_1 = __importDefault(require("../middleware/validate"));
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
};
const router = express_1.default.Router();
router.get(URL.baseUrl, home_1.default);
router.post(URL.api, create_1.default.manualData);
router.get(URL.api, read_1.default.allData);
router.put(URL.api, update_1.default.idKey);
router.delete(URL.api, delete_1.default.manualData);
router.post(URL.cart, validate_1.default.token, create_1.default.cartData, read_1.default.cartData);
// router.get(URL.cart, validate.token, read.cartData);
router.put(URL.cart, validate_1.default.token, update_1.default.cartData);
router.delete(URL.cart, validate_1.default.token, delete_1.default.cartData);
router.post(URL.inventory, create_1.default.inventoryData);
router.get(URL.inventory, read_1.default.inventoryData);
router.put(URL.inventory, update_1.default.inventoryData);
router.put(URL.inventory, delete_1.default.inventoryData);
router.post(URL.login, login_1.default.withToken, login_1.default.withPassword);
router.post(URL.logout, logout_1.default.withToken);
router.post(URL.signup, signup_1.default.withPassword);
// router.get(URL.account, account.fetchInfo);
router.post(URL.account, account_1.default.fetchInfo);
router.delete(URL.account, account_1.default.delete);
function handleAsyncError(asyncError) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = yield asyncError;
        const message = error.message;
        let code = error.code;
        if (!code || code >= 600)
            code = httpCodes_1.default.error.serverError;
        return { error, code, message };
    });
}
exports.handleAsyncError = handleAsyncError;
exports.default = router;
