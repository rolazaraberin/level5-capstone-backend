import { isArrayEmpty } from "../utils/utilityFunctions";
import {
  createCart,
  getItemsByCart,
  getCartById,
  deleteCartById,
} from "./cartUtils";
import { getValidCredentials } from "./testUtils";

jest.setTimeout(25000);

describe("createCart()", () => {
  it("returns the id of newly created cart", async () => {
    const cartId = await createCart();
    expect(cartId).toBeDefined();
    const cart = await getCartById(cartId);
    const result = Number(cart.id);
    await deleteCartById(cartId);
    expect(result).toBe(cartId);
  });
});

describe("getItemsByCart()", () => {
  test("Given a cart, it returns its items", async () => {
    const { cartID } = await getValidCredentials();
    const cart = await getCartById(cartID);
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
    const result = getCartById(id);
    await expect(result).rejects.toBeDefined();
  });
});
