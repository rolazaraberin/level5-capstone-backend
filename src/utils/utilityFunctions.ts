import { AnyObject } from "./UtilityTypes";
import _, { cloneDeep, isEqual, values, difference } from "lodash";
import { unproxy } from "./utilityFunctionsRedux";

export {
  // AnyObject,
  copyValuesOf,
  combine,
  convertToHtmlDocument,
  convertToTextDocument,
  find,
  filterSort,
  floorOf,
  getFormEntries,
  getMultiArrayValue,
  getUniqueValues,
  getObjectProperties,
  isUniqueValue,
  isDOMobjectReady,
  isHTMLfile,
  isChar,
  isEmpty,
  isArrayEmpty,
  isObjectEmpty,
  isURL,
  map,
  mapProperties,
  matchIsEqual,
  matchIndex,
  matchProperty,
  matchAllProperties,
  matchValue,
  noHandler,
  outIndex,
  outProperty,
  outValue,
  pressEnter,
  reduce,
  reduceArray,
  reduceObject,
  removeElement,
  removeFileExtension,
  runCallback,
  serialize,
  stringify,
  temporarilyShrink,
  toArrayish,
  toFields,
  toFormEntries,
  toClone,
  toCloneDeep,
};

type SimilarObject = { [property: string]: any };

function copyValuesOf(source: AnyObject, copy: SimilarObject) {
  let property, value;
  for (property in source) {
    try {
      value = source[property];
      copy[property] = value;
    } catch (couldntCopyValue) {
      console.log(`Couldn't copy ${property}:${value}`);
    }
  }
}
function combine(value1: any, value2: any) {
  //MERGE STRINGS, ARRAYS, AND OBJECTS
  //MERGED STRINGS ARE SEPERATED BY SPACE

  if (typeof value1 != typeof value2)
    throw Error("Cannot combine different types");
  if (typeof value1 == "string") return `${value1} ${value2}`;
  if (value1 instanceof Array) return [...value1, ...value2];
  if (typeof value1 == "object") return { ...value1, ...value2 };
}
function removeElement(
  element: HTMLElement,
  _index: number,
  _array: HTMLElement[]
) {
  //console.log("removing", element);
  element.remove();
}
async function convertToHtmlDocument(fileString: string) {
  //fileString = `${fileString}?${new Date().getTime()}`;
  //console.log("filestring", fileString);
  /*
  let fileContent = await fetch(fileString);
  //console.log("file", fileContent);
  let htmlContent = await fileContent.text();
  */
  let htmlContent = await convertToTextDocument(fileString);
  //console.log("content", htmlContent);
  //let htmlDocument = stringToHTML(htmlContent);
  let htmlDocument = new DOMParser().parseFromString(htmlContent, "text/html");
  //console.log("document", htmlDocument);
  if (isHTMLfile(fileString)) {
    //console.log(`${fileString} is html`);
    return Promise.resolve(htmlDocument);
  } else {
    //console.log(`${fileString} is not html`);
    return Promise.reject(htmlDocument);
  }
}
async function convertToTextDocument(fileString: string) {
  let fileContent = await fetch(fileString);
  //console.log("file", fileContent);
  let textContent = await fileContent.text();
  return textContent;
}
function filterSort(array: any[] | any, isMatch: Function) {
  const match: any[] = [];
  const notMatch: any[] = [];
  return reduce(array, toFilterSort, [match, notMatch]);

  function toFilterSort(
    filtered: [any[], any[]] = [[], []],
    value: any,
    _index: number,
    _array: any[]
  ) {
    const match = filtered[0];
    const notMatch = filtered[1];
    if (isMatch(value)) match.push(value);
    else notMatch.push(value);
    return filtered;
  }
}
function find(collection: any, callback: Function, startingIndex = 0) {
  if (startingIndex !== 0)
    throw new Error("find() startingIndex not yet implemented");
  if (!(collection instanceof Array)) collection = [collection];
  collection.find(callback);
}
function floorOf(number: number, decimalPlaces: number) {
  const shifted = number * decimalPlaces * 10;
  const truncated = Math.trunc(shifted);
  const unshifted = truncated / (decimalPlaces * 10);
  return unshifted;
}
function getFormEntries(formElement: HTMLFormElement) {
  //const fields = Array.from(formElement.children);
  const fields = formElement.querySelectorAll("[name]");
  // console.log("form", formElement);
  // console.log("fields", fields);

  // let entries = _.reduce(fields, toFormEntries);
  let entries = reduce(fields, toFormEntries);
  // if (fields.length === 1) entries = toFormEntries({}, entries);
  return entries;
}
function getMultiArrayValue(indexArray: number[], array: any[]): any {
  if (isEmpty(indexArray)) {
    const value = array;
    return value;
  }
  const index = indexArray.shift() as number;
  return getMultiArrayValue(indexArray, array[index]);
}
function getUniqueValues(array: any[]) {
  const arrayWithUniqueValues = array.filter(isUniqueValue);
  return arrayWithUniqueValues;
}
function getObjectProperties(object: AnyObject) {
  let property: string;
  const properties: string[] = [];
  for (property in object) {
    properties.push(property);
  }
  return properties;
}

function isChar(string: string) {
  return typeof string === "string" && string.length === 1;
}
function isUniqueValue(value: any, index: number, array: any[]) {
  return array.indexOf(value) === index;
}
function isDOMobjectReady(DOMobject: Document) {
  if (DOMobject.readyState !== "loading") {
    DOMobject.removeEventListener("readystatechange", _listener);
    return Promise.resolve(`${DOMobject} is ready`);
  } else {
    DOMobject.addEventListener("readystatechange", _listener);
  }
  /**************************************
   * HELPER FUNCTIONS
   **************************************/
  function _listener(event: Event) {
    isDOMobjectReady(event.target as Document);
  }
}
function isHTMLfile(filenameString: string) {
  let htmlRegex = /\.html$/;
  //console.log(filenameString, htmlRegex.test(filenameString));
  return htmlRegex.test(filenameString);
}
function isEmpty(object: any) {
  if (object instanceof Array) return isArrayEmpty(object);
  else if (object instanceof Object) return isObjectEmpty(object);
  else if (object === null || object === undefined) return true;
  else return false;
}
function isArrayEmpty(array: any[]) {
  if (!array) return array;
  const numberOfValues = array.length;
  return numberOfValues === 0;
}
function isObjectEmpty(object: {}) {
  const numberOfValues = Object.keys(object).length;
  return numberOfValues === 0;
}
function isURL(urlString: string) {
  let urlRegex = /^http(s):\/\//i;
  //console.log(filenameString, htmlRegex.test(filenameString));
  return urlRegex.test(urlString);
}
function map(collection: any, callback: Function) {
  if (!(collection instanceof Array)) collection = [collection];
  // const mapped = collection.forEach(callback);
  return collection.map(callback);
}
function mapProperties(object: any, callback: Function) {
  if (!object) return [];
  const properties = Object.getOwnPropertyNames(object);
  if (!properties) return [];

  const results = [] as any[];
  properties.forEach((property) => {
    const result = callback(object[property], property, object);
    results.push(result);
  });
  return results;
}
function matchIsEqual(value: any) {
  return function (value2: any, _index: number | string, _array: any) {
    return isEqual(value, value2);
  };
}
function matchIndex(indexToMatch: number | string) {
  //USE THIS WITH FILTER
  //MATCH THE INDEX IN THE ARRAY

  return function (_value: any, index: number | string, _array: any[]) {
    return index === indexToMatch;
  };
}
function matchProperty(property: string | string[], valueToMatch: any) {
  //USE THIS WITH FILTER
  //MATCH A NESTED PROPERTY IN THE OBJECT ARRAY
  if (typeof property === "string") property = [property];

  return function (object: any, _index: number | string, _array: any[]) {
    let value = object;
    try {
      for (let stringIndex of property) {
        value = value[stringIndex];
      }
      return value === valueToMatch;
    } catch (invalidProperty) {
      return false;
    }
  };
}

function matchAllProperties(propertiesAndValues: {
  [properties: string]: any;
}) {
  //USE THIS WITH FILTER
  //MATCH A NESTED PROPERTY IN THE OBJECT ARRAY
  //PASS IN OBJECTS LIKE { propertyToMatch: valueToMatch }

  return function (object: any, _index: number | string, _array: any[]) {
    // console.log(unproxy(object));
    let isMatching = true;
    for (let property in propertiesAndValues) {
      const value = propertiesAndValues[property];
      isMatching = isMatching && object[property] === value;
      if (!isMatching) return false;
    }
    return true;
    // let value = object;
    // for (let stringIndex of property) {
    //   value = value[stringIndex];
    // }
    // return value === valueToMatch;
  };
}

function matchValue(valueToMatch: any) {
  //USE THIS WITH FILTER
  //MATCH THE VALUE IN THE ARRAY

  return function (value: any, _index: number | string, _array: any[]) {
    return value === valueToMatch;
  };
}
function noHandler() {
  //THIS FUNCTION IS INTENTIONALLY EMPTY
  //IT INDICATES THAT NO HANDLER WILL BE USED
}
function outIndex(indexToRemove: number | string) {
  //USE THIS WITH FILTER
  //FILTER OUT THE INDEX FROM THE ARRAY

  return function (_value: any, index: number | string, _array: any[]) {
    return index !== indexToRemove;
  };
}
function outProperty(property: string | string[], valueToMatch: any) {
  //USE THIS WITH FILTER
  //MATCH A NESTED PROPERTY IN THE OBJECT ARRAY
  if (typeof property === "string") property = [property];

  return function (object: any, _index: number | string, _array: any[]) {
    let value = object;
    for (let stringIndex of property) {
      // if (value[stringIndex]) value = value[stringIndex];
      // else return true;
      value = value[stringIndex];
    }
    return value !== valueToMatch;
  };
}
function outValue(valueToRemove: any) {
  //USE THIS WITH FILTER
  //FILTER OUT THE VALUE FROM THE ARRAY

  return function (value: any, _index: number | string, _array: any[]) {
    return value !== valueToRemove;
  };
}
function pressEnter() {
  //PAUSE - https://stackoverflow.com/questions/54182732/process-never-ends-when-using-process-stdin-once
  return new Promise(_pressEnter);

  function _pressEnter(resolve: Function, _reject: Function) {
    process.stdin.resume();
    process.stdin.once("data", () => {
      process.stdin.pause();
      return resolve();
    });
  }
}

function serialize(object: any) {
  const serialized: any = {};
  for (let property in object) {
    const value = object[property];
    serialized[property] = value;
  }
  return serialized;
}

function stringify(object: any) {
  const replacer = undefined;
  const spacer = " ";
  const string = JSON.stringify(object, replacer, spacer);
  return string;
}

function temporarilyShrink(htmlElement: HTMLElement) {
  let container = htmlElement.parentElement as HTMLElement;
  let { offsetHeight: containerHeight, offsetWidth: containerWidth } =
    container || {};
  //const originalContainerSize = forceElementSizeToStay(container);
  const originalContainerSize = forceStyleSize(
    container,
    containerHeight,
    containerWidth
  );
  //const { offsetHeight: elementHeight, offsetWidth: elementWidth } = htmlElement;
  const currentHeight = htmlElement.offsetHeight;
  const currentWidth = htmlElement.offsetWidth;
  const shrinkPercent = 0.05;
  const tempHeight = currentHeight - currentHeight * shrinkPercent;
  const tempWidth = currentWidth - currentWidth * shrinkPercent;

  const originalElementSize = forceStyleSize(
    htmlElement,
    tempHeight,
    tempWidth
  );

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
function reduce(
  collection: any,
  callback: Function,
  initialValue: any = undefined
) {
  // if (!collection) return initialValue || [];
  if (!collection) return initialValue;
  if (collection instanceof Array)
    return reduceArray(collection, callback, initialValue);
  else return reduceObject(collection, callback, initialValue);

  // if (collection instanceof Object)
  //   return reduceObject(collection, callback, initialValue);

  // collection = [collection];
  // return reduceArray(collection, callback, initialValue);
}
function reduceArray(array: any[], callback: Function, initialValue?: any) {
  if (!(array instanceof Array))
    throw new Error("An array was not passed to reduceArray()");
  let reducedValue = initialValue;
  array.forEach(function (currentValue, index, arrayCopy) {
    reducedValue = callback(reducedValue, currentValue, index, arrayCopy);
  });
  if (array.length === 0) reducedValue = callback(reducedValue);
  return reducedValue;
}
function reduceObject(
  object: AnyObject,
  callback: Function,
  initialValue?: any
) {
  if (
    object instanceof Array ||
    typeof object === "string" ||
    typeof object === "number"
  )
    throw new Error("An object was not passed to reduceObject()");
  let reducedValue = initialValue;
  for (let property in object) {
    const value = object[property];
    reducedValue = callback(reducedValue, value, property, object);
  }
  if (isEmpty(object)) reducedValue = callback(reducedValue);
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
function removeFileExtension(filename: string) {
  const splitFilename = filename.split(".");
  if (splitFilename.length > 2) splitFilename.pop();
  const extensionRemoved = splitFilename.join(".");
  return extensionRemoved;
}
function restoreStyleSize(
  htmlElement: HTMLElement,
  originalSizeObject: ReturnType<typeof forceStyleSize>
) {
  const original = originalSizeObject;
  htmlElement.style.height = original.style.height;
  htmlElement.style.width = original.style.width;
}
function runCallback(callback: Function, _index: number, _array: any[]) {
  callback();
}
// function unforceElementSize(htmlElement, originalSize) {
//   //htmlElement.offsetHeight = originalSize.offsetHeight;
//   //htmlElement.offsetWidth = originalSize.offsetWidth;
//   htmlElement.style.height = originalSize.height;
//   htmlElement.style.width = originalSize.width;
// }
function forceStyleSize(
  htmlElement: HTMLElement,
  height: number | string,
  width: number | string
) {
  const originalSize = {
    style: { height: htmlElement.style.height, width: htmlElement.style.width },
    offsetHeight: htmlElement.offsetHeight,
    offsetWidth: htmlElement.offsetWidth,
  };
  htmlElement.style.height = `${height}px`;
  htmlElement.style.width = `${width}px`;
  return originalSize;
}
function toArrayish(
  arrayish: { [index: number]: any } = {},
  value: any,
  index: number,
  _array: any[]
) {
  //USE WITH reduce()

  arrayish[index] = value;
  return arrayish;
}
function toFields(fieldList: any, object: {}, index: number, _array: string[]) {
  if (!(fieldList instanceof Array)) fieldList = [];
  const fields = Object.keys(object);
  const newFields = difference(fields, fieldList);
  // const newFields = _.difference(fields, fieldList);
  // if (newFields) fieldList = fieldList.concat(newFields);
  fieldList = fieldList.concat(newFields);
  // for (field in object) {
  //   let isInList = fieldList.find( (value)=> field === value);
  //   if (!isInList) fieldList.push(field);
  // }
  return fieldList;
}
function toFormEntries(
  // entries: any,
  entries: AnyObject = {},
  element: HTMLFormElement,
  index?: number,
  _array?: HTMLElement[]
) {
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
  if (name) entries[name] = value;

  return entries;
}
function toClone(value: any, _index: number, _array: any[]) {
  debugger;
  return value;
}
function toCloneDeep(value: any, _index: number, _array: any[]) {
  return cloneDeep(value);
}
