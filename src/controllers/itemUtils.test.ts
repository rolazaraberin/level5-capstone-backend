import { getItemById } from "./itemUtils";

jest.setTimeout(25000);

describe("getItemById()", () => {
  test("Given an id, it returns an item", getId);
  test.skip("Given no id, it throws an error", noId);
  test.skip("Given an object, it throws an error", objectId);
  test.skip("Given an array, it throws an error", arrayId);
});

async function getId() {
  const id = 2;
  const item = await getItemById(id);
  const result = Number(item.id);
  expect(result).toBe(2);
}

async function noId() {
  let id: any, result: any;
  id = undefined;
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();

  id = null;
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();

  id = "";
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();

  id = {};
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();

  id = [];
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();
}

async function objectId() {
  let id: any, result: any;

  id = {};
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();

  id = { id: 2 };
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();
}

async function arrayId() {
  let id: any, result: any;

  id = [];
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();

  id = [2];
  result = getItemById(id);
  await expect(result).rejects.toBeDefined();
}
