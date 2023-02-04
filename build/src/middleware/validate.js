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
const router_1 = require("../routes/router");
const authenticate_1 = __importDefault(require("../controllers/authenticate"));
const validate = { token };
exports.default = validate;
function token(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, token } = request.body.user;
            yield authenticate_1.default.token(email, token);
            return next();
        }
        catch (asyncError) {
            const { code, message } = yield (0, router_1.handleAsyncError)(asyncError);
            response.status(code).send(message);
        }
    });
}
