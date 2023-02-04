"use strict";
//UTILITY FUNCTIONS THAT ONLY WORK WITH NODE JS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const crypto_1 = __importDefault(require("crypto"));
function hash(string, algorithm = "sha256") {
    try {
        const hashCode = crypto_1.default.createHash(algorithm).update(string).digest("hex");
        return hashCode;
    }
    catch (error) {
        return undefined;
    }
}
exports.hash = hash;
