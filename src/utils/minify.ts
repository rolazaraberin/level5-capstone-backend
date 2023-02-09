//THIS APP MINIFIES AND COMPRESSES THE CONTENTS OF THE BUILD FOLDER
//USING TERSER ON DIRECTORIES
//INFO - https://github.com/terser/terser/issues/544#issuecomment-598192241
//API REFERENCE - https://terser.org/docs/api-reference

const Terser = require("terser");
// const fs = require("fs");
// const path = require("path");
// import Terser from "terser";
// import { minify } from "terser";
import fs from "fs";
import path from "path";
import { getCommandLineParameters, pressEnter } from "./utilityFunctions";

const terserOptions = {
  mangle: false,
  keep_classnames: true,
  keep_fnames: true,
  compress: {
    defaults: true,
    unused: false,
  },
};

//MAIN///////////////////////////////////////////////////////

const folderToMinify = getCommandLineParameters()[0];
const pathToMinify = path.resolve(folderToMinify);
if (folderToMinify) {
  console.log("WARNING: THIS WILL OVERWRITE FILES IN:\n" + pathToMinify);
  console.log("PRESS ENTER TO CONTINUE. PRESS CTRL+C TO CANCEL");
  pressEnter().then(() => {
    const files = getAllFiles(folderToMinify);
    // const files = getAllFiles("./build");
    minifyFiles(files);
  });
} else {
  console.log("\nPlease specify the folder to minify.\n");
}

//FUNCTIONS///////////////////////////////////////////////////

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  // function getAllFiles(dirPath, arrayOfFiles = []) {
  const folder = path.resolve(dirPath);
  let files = fs.readdirSync(folder);

  // arrayOfFiles = arrayOfFiles || [];

  // files.forEach(function (file: string) {
  files.forEach(function (file) {
    if (fs.statSync(folder + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      const pwd = path.resolve(".");
      arrayOfFiles.push(path.join(pwd, dirPath, "/", file));
      // arrayOfFiles.push(path.join(__dirname, folder, "/", file));
    }
  });

  return arrayOfFiles.filter((path) => path.match(/\.js$/));
}

// function minifyFiles(filePaths: string[]) {
function minifyFiles(filePaths) {
  filePaths.forEach(async (filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    const minified = await Terser.minify(data, terserOptions);
    fs.writeFileSync(filePath, minified.code);
  });
}
