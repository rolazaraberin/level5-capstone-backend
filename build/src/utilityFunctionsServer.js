"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUsedProperties = exports.getValidValues = void 0;
// import { filter, isEmpty } from "lodash";
const utilityFunctions_1 = require("./utils/utilityFunctions");
const validValues = [
    {
        table: "cart",
        properties: ["id", "itemsTable", "totalQuantity", "totalPrice"],
    },
    // { table: "cartItems", properties: ["itemID", "quantity", "subtotal"] },
    { table: "item", properties: ["id", "itemID", "quantity", "subtotal"] },
    {
        table: "inventory",
        properties: ["id", "itemsTable", "totalQuantity", "totalPrice"],
    },
    { table: "user", properties: ["email", "token"] },
];
function getValidValues(object, validTablesAndProperties = validValues) {
    //FORMAT OF validTablesAndProperties
    //[ {table: tableName, properties: ["property1","property2"]}, {...} ]
    if (!(validTablesAndProperties instanceof Array))
        validTablesAndProperties = [validTablesAndProperties];
    let validValues = {};
    for (let validObject of validTablesAndProperties) {
        const table = validObject.table;
        let validProperties = validObject.properties;
        if (!(validProperties instanceof Array))
            validProperties = [validProperties];
        const validPropertiesAndValues = (0, utilityFunctions_1.reduce)(object[table], toUsedProperties(validProperties));
        // const validPropertiesAndValues = reduce(
        //   object[table],
        //   toUsedProperties(validProperties),
        //   {}
        // );
        if (!(0, utilityFunctions_1.isEmpty)(validPropertiesAndValues))
            validValues[table] = validPropertiesAndValues;
    }
    if ((0, utilityFunctions_1.isEmpty)(validValues))
        return null;
    else
        return validValues;
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
exports.getValidValues = getValidValues;
function toUsedProperties(propertiesArray) {
    return function (usedProperties = {}, value, property, _object) {
        if (value === undefined || value < 0)
            return usedProperties;
        if (propertiesArray.includes(property))
            usedProperties[property] = value;
        return usedProperties;
    };
}
exports.toUsedProperties = toUsedProperties;
