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
exports.toCloneDeep = exports.toClone = exports.toFormEntries = exports.toFields = exports.toArrayish = exports.timeout = exports.temporarilyShrink = exports.stringify = exports.serialize = exports.runCallback = exports.removeFileExtension = exports.removeElement = exports.reduceObject = exports.reduceArray = exports.reduce = exports.quoteValues = exports.pressEnter = exports.outValue = exports.outProperty = exports.outIndex = exports.noHandler = exports.matchValue = exports.matchAllProperties = exports.matchProperty = exports.matchIndex = exports.matchIsEqual = exports.mapProperties = exports.map = exports.isURL = exports.isObjectEmpty = exports.isArrayEmpty = exports.isEmpty = exports.isChar = exports.isHTMLfile = exports.isDOMobjectReady = exports.isUniqueValue = exports.hash = exports.getObjectProperties = exports.getUniqueValues = exports.getMultiArrayValue = exports.getFormEntries = exports.generateKey = exports.floorOf = exports.filterSort = exports.find = exports.convertToTextDocument = exports.convertToHtmlDocument = exports.combine = exports.copyValuesOf = void 0;
const lodash_1 = require("lodash");
const crypto_js_1 = __importDefault(require("crypto-js"));
function copyValuesOf(source, copy) {
    let property, value;
    for (property in source) {
        try {
            value = source[property];
            copy[property] = value;
        }
        catch (couldntCopyValue) {
            console.log(`Couldn't copy ${property}:${value}`);
        }
    }
}
exports.copyValuesOf = copyValuesOf;
function combine(value1, value2) {
    //MERGE STRINGS, ARRAYS, AND OBJECTS
    //MERGED STRINGS ARE SEPERATED BY SPACE
    if (typeof value1 != typeof value2)
        throw Error("Cannot combine different types");
    if (typeof value1 == "string")
        return `${value1} ${value2}`;
    if (value1 instanceof Array)
        return [...value1, ...value2];
    if (typeof value1 == "object")
        return Object.assign(Object.assign({}, value1), value2);
}
exports.combine = combine;
function removeElement(element, _index, _array) {
    //console.log("removing", element);
    element.remove();
}
exports.removeElement = removeElement;
function convertToHtmlDocument(fileString) {
    return __awaiter(this, void 0, void 0, function* () {
        //fileString = `${fileString}?${new Date().getTime()}`;
        //console.log("filestring", fileString);
        /*
        let fileContent = await fetch(fileString);
        //console.log("file", fileContent);
        let htmlContent = await fileContent.text();
        */
        let htmlContent = yield convertToTextDocument(fileString);
        //console.log("content", htmlContent);
        //let htmlDocument = stringToHTML(htmlContent);
        let htmlDocument = new DOMParser().parseFromString(htmlContent, "text/html");
        //console.log("document", htmlDocument);
        if (isHTMLfile(fileString)) {
            //console.log(`${fileString} is html`);
            return Promise.resolve(htmlDocument);
        }
        else {
            //console.log(`${fileString} is not html`);
            return Promise.reject(htmlDocument);
        }
    });
}
exports.convertToHtmlDocument = convertToHtmlDocument;
function convertToTextDocument(fileString) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileContent = yield fetch(fileString);
        //console.log("file", fileContent);
        let textContent = yield fileContent.text();
        return textContent;
    });
}
exports.convertToTextDocument = convertToTextDocument;
function filterSort(array, isMatch) {
    const match = [];
    const notMatch = [];
    return reduce(array, toFilterSort, [match, notMatch]);
    function toFilterSort(filtered = [[], []], value, _index, _array) {
        const match = filtered[0];
        const notMatch = filtered[1];
        if (isMatch(value))
            match.push(value);
        else
            notMatch.push(value);
        return filtered;
    }
}
exports.filterSort = filterSort;
function find(collection, callback, startingIndex = 0) {
    if (startingIndex !== 0)
        throw new Error("find() startingIndex not yet implemented");
    if (!(collection instanceof Array))
        collection = [collection];
    collection.find(callback);
}
exports.find = find;
function floorOf(number, decimalPlaces) {
    const shifted = number * decimalPlaces * 10;
    const truncated = Math.trunc(shifted);
    const unshifted = truncated / (decimalPlaces * 10);
    return unshifted;
}
exports.floorOf = floorOf;
let numberOfKeysGenerated = 0;
function generateKey() {
    return new Date().getTime() + "-" + numberOfKeysGenerated++;
}
exports.generateKey = generateKey;
function getFormEntries(formElement) {
    //const fields = Array.from(formElement.children);
    const fields = formElement.querySelectorAll("[name]");
    // console.log("form", formElement);
    // console.log("fields", fields);
    // let entries = _.reduce(fields, toFormEntries);
    let entries = reduce(fields, toFormEntries);
    // if (fields.length === 1) entries = toFormEntries({}, entries);
    return entries;
}
exports.getFormEntries = getFormEntries;
function getMultiArrayValue(indexArray, array) {
    if (isEmpty(indexArray)) {
        const value = array;
        return value;
    }
    const index = indexArray.shift();
    return getMultiArrayValue(indexArray, array[index]);
}
exports.getMultiArrayValue = getMultiArrayValue;
function getUniqueValues(array) {
    const arrayWithUniqueValues = array.filter(isUniqueValue);
    return arrayWithUniqueValues;
}
exports.getUniqueValues = getUniqueValues;
function getObjectProperties(object) {
    let property;
    const properties = [];
    for (property in object) {
        properties.push(property);
    }
    return properties;
}
exports.getObjectProperties = getObjectProperties;
function hash(string) {
    try {
        if (!string)
            return undefined;
        const hashObject = crypto_js_1.default.SHA256(string);
        const hashCode = hashObject.toString(crypto_js_1.default.enc.Hex);
        return hashCode;
    }
    catch (error) {
        return undefined;
    }
}
exports.hash = hash;
function isChar(string) {
    return typeof string === "string" && string.length === 1;
}
exports.isChar = isChar;
function isUniqueValue(value, index, array) {
    return array.indexOf(value) === index;
}
exports.isUniqueValue = isUniqueValue;
function isDOMobjectReady(DOMobject) {
    if (DOMobject.readyState !== "loading") {
        DOMobject.removeEventListener("readystatechange", _listener);
        return Promise.resolve(`${DOMobject} is ready`);
    }
    else {
        DOMobject.addEventListener("readystatechange", _listener);
    }
    /**************************************
     * HELPER FUNCTIONS
     **************************************/
    function _listener(event) {
        isDOMobjectReady(event.target);
    }
}
exports.isDOMobjectReady = isDOMobjectReady;
function isHTMLfile(filenameString) {
    let htmlRegex = /\.html$/;
    //console.log(filenameString, htmlRegex.test(filenameString));
    return htmlRegex.test(filenameString);
}
exports.isHTMLfile = isHTMLfile;
function isEmpty(object) {
    if (object instanceof Array)
        return isArrayEmpty(object);
    else if (object instanceof Object)
        return isObjectEmpty(object);
    else if (object === null || object === undefined || object === "")
        return true;
    else
        return false;
}
exports.isEmpty = isEmpty;
function isArrayEmpty(array) {
    if (!array)
        return array;
    const numberOfValues = array.length;
    return numberOfValues === 0;
}
exports.isArrayEmpty = isArrayEmpty;
function isObjectEmpty(object) {
    const numberOfValues = Object.keys(object).length;
    return numberOfValues === 0;
}
exports.isObjectEmpty = isObjectEmpty;
function isURL(urlString) {
    let urlRegex = /^http(s):\/\//i;
    //console.log(filenameString, htmlRegex.test(filenameString));
    return urlRegex.test(urlString);
}
exports.isURL = isURL;
function map(collection, callback) {
    if (!(collection instanceof Array))
        collection = [collection];
    // const mapped = collection.forEach(callback);
    return collection.map(callback);
}
exports.map = map;
function mapProperties(object, callback) {
    if (!object)
        return [];
    const properties = Object.getOwnPropertyNames(object);
    if (!properties)
        return [];
    const results = [];
    properties.forEach((property) => {
        const result = callback(object[property], property, object);
        results.push(result);
    });
    return results;
}
exports.mapProperties = mapProperties;
function matchIsEqual(value) {
    return function (value2, _index, _array) {
        return (0, lodash_1.isEqual)(value, value2);
    };
}
exports.matchIsEqual = matchIsEqual;
function matchIndex(indexToMatch) {
    //USE THIS WITH FILTER
    //MATCH THE INDEX IN THE ARRAY
    return function (_value, index, _array) {
        return index === indexToMatch;
    };
}
exports.matchIndex = matchIndex;
function matchProperty(property, valueToMatch) {
    //USE THIS WITH FILTER
    //MATCH A NESTED PROPERTY IN THE OBJECT ARRAY
    if (typeof property === "string")
        property = [property];
    return function (object, _index, _array) {
        let value = object;
        try {
            for (let stringIndex of property) {
                value = value[stringIndex];
            }
            return value === valueToMatch;
        }
        catch (invalidProperty) {
            return false;
        }
    };
}
exports.matchProperty = matchProperty;
function matchAllProperties(propertiesAndValues) {
    //USE THIS WITH FILTER
    //MATCH A NESTED PROPERTY IN THE OBJECT ARRAY
    //PASS IN OBJECTS LIKE { propertyToMatch: valueToMatch }
    return function (object, _index, _array) {
        // console.log(unproxy(object));
        let isMatching = true;
        for (let property in propertiesAndValues) {
            const value = propertiesAndValues[property];
            isMatching = isMatching && object[property] === value;
            if (!isMatching)
                return false;
        }
        return true;
        // let value = object;
        // for (let stringIndex of property) {
        //   value = value[stringIndex];
        // }
        // return value === valueToMatch;
    };
}
exports.matchAllProperties = matchAllProperties;
function matchValue(valueToMatch) {
    //USE THIS WITH FILTER
    //MATCH THE VALUE IN THE ARRAY
    return function (value, _index, _array) {
        return value === valueToMatch;
    };
}
exports.matchValue = matchValue;
function noHandler() {
    //THIS FUNCTION IS INTENTIONALLY EMPTY
    //IT INDICATES THAT NO HANDLER WILL BE USED
}
exports.noHandler = noHandler;
function outIndex(indexToRemove) {
    //USE THIS WITH FILTER
    //FILTER OUT THE INDEX FROM THE ARRAY
    return function (_value, index, _array) {
        return index !== indexToRemove;
    };
}
exports.outIndex = outIndex;
function outProperty(property, valueToMatch) {
    //USE THIS WITH FILTER
    //MATCH A NESTED PROPERTY IN THE OBJECT ARRAY
    if (typeof property === "string")
        property = [property];
    return function (object, _index, _array) {
        let value = object;
        for (let stringIndex of property) {
            // if (value[stringIndex]) value = value[stringIndex];
            // else return true;
            value = value[stringIndex];
        }
        return value !== valueToMatch;
    };
}
exports.outProperty = outProperty;
function outValue(valueToRemove) {
    //USE THIS WITH FILTER
    //FILTER OUT THE VALUE FROM THE ARRAY
    return function (value, _index, _array) {
        return value !== valueToRemove;
    };
}
exports.outValue = outValue;
function pressEnter() {
    //PAUSE - https://stackoverflow.com/questions/54182732/process-never-ends-when-using-process-stdin-once
    return new Promise(_pressEnter);
    function _pressEnter(resolve, _reject) {
        process.stdin.resume();
        process.stdin.once("data", () => {
            process.stdin.pause();
            return resolve();
        });
    }
}
exports.pressEnter = pressEnter;
function quoteValues(array) {
    if (!array)
        return array;
    const quotedArray = array.map((value) => `"${value}"`);
    return quotedArray;
}
exports.quoteValues = quoteValues;
function serialize(object) {
    const serialized = {};
    for (let property in object) {
        const value = object[property];
        serialized[property] = value;
    }
    return serialized;
}
exports.serialize = serialize;
function stringify(object) {
    const replacer = undefined;
    const spacer = " ";
    const string = JSON.stringify(object, replacer, spacer);
    return string;
}
exports.stringify = stringify;
function temporarilyShrink(htmlElement) {
    let container = htmlElement.parentElement;
    let { offsetHeight: containerHeight, offsetWidth: containerWidth } = container || {};
    //const originalContainerSize = forceElementSizeToStay(container);
    const originalContainerSize = forceStyleSize(container, containerHeight, containerWidth);
    //const { offsetHeight: elementHeight, offsetWidth: elementWidth } = htmlElement;
    const currentHeight = htmlElement.offsetHeight;
    const currentWidth = htmlElement.offsetWidth;
    const shrinkPercent = 0.05;
    const tempHeight = currentHeight - currentHeight * shrinkPercent;
    const tempWidth = currentWidth - currentWidth * shrinkPercent;
    const originalElementSize = forceStyleSize(htmlElement, tempHeight, tempWidth);
    //forceStyleSize(htmlElement, tempHeight, tempWidth);
    //htmlElement.style.width = `${tempWidth}px`;
    //htmlElement.style.height = `${tempHeight}px`;
    // htmlElement.animate({ width: tempWidth });
    // htmlElement.animate({ width: tempHeight });
    const delay = 100;
    setTimeout(restoreSizes, delay);
    /*******************************************/
    function restoreSizes() {
        const originalHeight = originalElementSize.offsetHeight;
        const originalWidth = originalElementSize.offsetWidth;
        forceStyleSize(htmlElement, originalHeight, originalWidth);
        restoreStyleSize(htmlElement, originalElementSize);
        restoreStyleSize(container, originalContainerSize);
        // htmlElement.style.width = `${elementWidth}px`;
        // htmlElement.style.height = `${elementHeight}px`;
        // htmlElement.animate({ width: originalWidth });
        // htmlElement.animate({ width: originalHeight });
        //unforceElementSize(container, originalContainerSize);
    }
}
exports.temporarilyShrink = temporarilyShrink;
// function forceElementSizeToStay(htmlElement) {
//   const originalSize = {
//     //offsetHeight: htmlElement.offsetHeight,
//     //offsetWidth: htmlElement.offsetWidth,
//     height: htmlElement.style.height,
//     width: htmlElement.style.width,
//   };
//   htmlElement.style.height = `${htmlElement.offsetHeight}px`;
//   htmlElement.style.width = `${htmlElement.offsetWidth}px`;
//   return originalSize;
// }
function reduce(collection, callback, initialValue = undefined) {
    // if (!collection) return initialValue || [];
    if (!collection)
        return initialValue;
    if (collection instanceof Array)
        return reduceArray(collection, callback, initialValue);
    else
        return reduceObject(collection, callback, initialValue);
    // if (collection instanceof Object)
    //   return reduceObject(collection, callback, initialValue);
    // collection = [collection];
    // return reduceArray(collection, callback, initialValue);
}
exports.reduce = reduce;
function reduceArray(array, callback, initialValue) {
    if (!(array instanceof Array))
        throw new Error("An array was not passed to reduceArray()");
    let reducedValue = initialValue;
    array.forEach(function (currentValue, index, arrayCopy) {
        reducedValue = callback(reducedValue, currentValue, index, arrayCopy);
    });
    if (array.length === 0)
        reducedValue = callback(reducedValue);
    return reducedValue;
}
exports.reduceArray = reduceArray;
function reduceObject(object, callback, initialValue) {
    if (object instanceof Array ||
        typeof object === "string" ||
        typeof object === "number")
        throw new Error("An object was not passed to reduceObject()");
    let reducedValue = initialValue;
    for (let property in object) {
        const value = object[property];
        reducedValue = callback(reducedValue, value, property, object);
    }
    if (isEmpty(object))
        reducedValue = callback(reducedValue);
    return reducedValue;
    // debugger;
    // const myObject = object;
    // if (initialValue === undefined) initialValue = {};
    // let reducedValue = initialValue;
    // object.forEach(
    //   (currentValue, index, arrayCopy) =>
    //     (reducedValue = callback(reducedValue, currentValue, index, arrayCopy))
    // );
    // return reducedValue;
}
exports.reduceObject = reduceObject;
function removeFileExtension(filename) {
    const splitFilename = filename.split(".");
    if (splitFilename.length > 2)
        splitFilename.pop();
    const extensionRemoved = splitFilename.join(".");
    return extensionRemoved;
}
exports.removeFileExtension = removeFileExtension;
function restoreStyleSize(htmlElement, originalSizeObject) {
    const original = originalSizeObject;
    htmlElement.style.height = original.style.height;
    htmlElement.style.width = original.style.width;
}
function runCallback(callback, _index, _array) {
    callback();
}
exports.runCallback = runCallback;
// function unforceElementSize(htmlElement, originalSize) {
//   //htmlElement.offsetHeight = originalSize.offsetHeight;
//   //htmlElement.offsetWidth = originalSize.offsetWidth;
//   htmlElement.style.height = originalSize.height;
//   htmlElement.style.width = originalSize.width;
// }
function forceStyleSize(htmlElement, height, width) {
    const originalSize = {
        style: { height: htmlElement.style.height, width: htmlElement.style.width },
        offsetHeight: htmlElement.offsetHeight,
        offsetWidth: htmlElement.offsetWidth,
    };
    htmlElement.style.height = `${height}px`;
    htmlElement.style.width = `${width}px`;
    return originalSize;
}
function timeout(milliseconds) {
    return new Promise(function (resolvePromise) {
        setTimeout(() => resolvePromise("Timeout complete"), milliseconds);
    });
}
exports.timeout = timeout;
function toArrayish(arrayish = {}, value, index, _array) {
    //USE WITH reduce()
    arrayish[index] = value;
    return arrayish;
}
exports.toArrayish = toArrayish;
function toFields(fieldList, object, index, _array) {
    if (!(fieldList instanceof Array))
        fieldList = [];
    const fields = Object.keys(object);
    const newFields = (0, lodash_1.difference)(fields, fieldList);
    // const newFields = _.difference(fields, fieldList);
    // if (newFields) fieldList = fieldList.concat(newFields);
    fieldList = fieldList.concat(newFields);
    // for (field in object) {
    //   let isInList = fieldList.find( (value)=> field === value);
    //   if (!isInList) fieldList.push(field);
    // }
    return fieldList;
}
exports.toFields = toFields;
function toFormEntries(
// entries: any,
entries = {}, element, index, _array) {
    //USE WITH reduce()
    // if (index === 1) {
    //   const firstElement = entries;
    //   const name = firstElement.name;
    //   const value = firstElement.value;
    //   entries = {} as HTMLFormElement;
    //   entries[name] = value;
    // }
    const name = element.name;
    // console.log(element);
    const value = element.value;
    if (name)
        entries[name] = value;
    return entries;
}
exports.toFormEntries = toFormEntries;
function toClone(value, _index, _array) {
    debugger;
    return value;
}
exports.toClone = toClone;
function toCloneDeep(value, _index, _array) {
    return (0, lodash_1.cloneDeep)(value);
}
exports.toCloneDeep = toCloneDeep;
