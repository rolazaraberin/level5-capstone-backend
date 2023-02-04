"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodeUtils_1 = require("./nodeUtils");
describe("hash()", () => {
    test("Given a string, it returns a hash", () => {
        const string = "string";
        const result = (0, nodeUtils_1.hash)(string);
        expect(result).toBe("473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8");
    });
    test("Given no parameters, it returns undefined", () => {
        const result = nodeUtils_1.hash();
        expect(result).toBeUndefined();
    });
});
