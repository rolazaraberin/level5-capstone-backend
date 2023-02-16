import { isArrayEmpty } from "../utils/utilityFunctions";
import {
  createCart,
  getItemsByCart,
  getCartById,
  deleteCartById,
} from "./cartUtils";

jest.setTimeout(25000);

describe("createCart()", () => {
  it("returns the id of newly created cart", async () => {
    const cartId = await createCart();
    expect(cartId).toBeDefined();
    const cart = await getCartById(cartId);
    const result = Number(cart.id);
    expect(result).toBe(cartId);
    await deleteCartById(cartId);
  });
});

describe("getItemsByCart()", () => {
  test("Given a cart, it returns its items", async () => {
    const cart = await getCartById(2);
    const result = await getItemsByCart(cart);
    if (isArrayEmpty(result)) expect(result).toBeDefined();
    else {
      const item = result[0];
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("price");
      expect(item).toHaveProperty("description");
    }
  });
});

describe("deleteCartById()", () => {
  test("Given a cart id, it deletes the cart", async () => {
    const id = await createCart();
    await deleteCartById(id);
    const result = await getCartById(id);
    expect(result).not.toBeDefined();
  });
});
