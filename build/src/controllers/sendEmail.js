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
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendEmail = { signupConfirmation, deleteConfirmation };
exports.default = sendEmail;
//CONNECT TO MAIL SERVICE
mail_1.default.setApiKey(process.env.sendGridApiKey);
function signupConfirmation(email) {
    const message = {
        from: "rolazaraberin.test@gmail.com",
        to: email,
        subject: "Signup Confirmation",
        text: `${email} has been signed up for Online Store`,
        html: `<p>${email} has been signed up for Online Store</p>`,
    };
    send(message);
}
function deleteConfirmation(email) {
    const message = {
        from: "rolazaraberin.test@gmail.com",
        to: email,
        subject: "Delete Confirmation",
        text: `${email} has been deleted from Online Store`,
        html: `<p>${email} has been deleted from Online Store</p>`,
    };
    send(message);
}
function send(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield mail_1.default.send(message);
            return response[0].statusCode;
        }
        catch (asyncError) {
            const error = yield asyncError;
            console.log(error);
            debugger;
        }
    });
}
