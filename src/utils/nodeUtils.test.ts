import { hash } from "./nodeUtils";

describe("hash()", () => {
  test("Given a string, it returns a hash", () => {
    const string = "string";
    const result = hash(string);
    expect(result).toBe(
      "473287f8298dba7163a897908958f7c0eae733e25d2e027992ea2edc9bed2fa8"
    );
  });
  test("Given no parameters, it returns undefined", () => {
    const result = (hash as any)();
    expect(result).toBeUndefined();
  });
});
