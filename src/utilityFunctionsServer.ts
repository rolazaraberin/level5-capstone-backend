import { filter, isEmpty, reduce } from "lodash";

const validValues = [
  { table: "cart", properties: ["itemsTable", "totalQuantity", "totalPrice"] },
  // { table: "cartItems", properties: ["itemID", "quantity", "subtotal"] },
  { table: "item", properties: ["itemID", "quantity", "subtotal"] },
  {
    table: "inventory",
    properties: ["itemsTable", "totalQuantity", "totalPrice"],
  },
];

export { getValidValues, toUsedProperties };

function getValidValues(object: any, validTablesAndProperties = validValues) {
  //FORMAT OF validTablesAndProperties
  //[ {table: tableName, properties: ["property1","property2"]}, {...} ]

  if (!(validTablesAndProperties instanceof Array))
    validTablesAndProperties = [validTablesAndProperties];
  let validValues: any = {};

  for (let validObject of validTablesAndProperties) {
    const table = validObject.table;

    let validProperties = validObject.properties;
    if (!(validProperties instanceof Array))
      validProperties = [validProperties];

    const validPropertiesAndValues = reduce(
      object[table],
      toUsedProperties(validProperties),
      {}
    );
    if (!isEmpty(validPropertiesAndValues))
      validValues[table] = validPropertiesAndValues;
  }
  if (isEmpty(validValues)) return null;
  else return validValues;

  // if (object[table]) {
  //   const validProperties = ["itemsTable", "totalQuantity", "totalPrice"];
  //   validValues[table] = filter(
  //     object[table],
  //     toUsedProperties(validProperties)
  //   );
  // }
  // if (object.item) {
  //   const validProperties = ["itemID", "quantity", "subtotal"];
  //   validValues.item = filter(object.item, toUsedProperties(validProperties));
  // }
}

function toUsedProperties(propertiesArray: any) {
  return function (
    usedProperties = {},
    value: any,
    property: any,
    _object: any
  ) {
    if (value === undefined || value < 0) return usedProperties;
    if (propertiesArray.includes(property)) usedProperties[property] = value;
    return usedProperties;
  };
}
