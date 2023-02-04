//UING TERSER ON DIRECTORIES
//INFO - https://github.com/terser/terser/issues/544#issuecomment-598192241
//API REFERENCE - https://terser.org/docs/api-reference

var Terser = require("terser");
var fs = require("fs");
var path = require("path");

const terserOptions = {
  mangle: false,
  keep_classnames: true,
  keep_fnames: true,
  compress: {
    defaults: true,
    unused: false,
  },
};

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  let files = fs.readdirSync(dirPath);

  // arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file: string) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles.filter((path) => path.match(/\.js$/));
}

function minifyFiles(filePaths: string[]) {
  filePaths.forEach(async (filePath) => {
    const data = fs.readFileSync(filePath, "utf8");
    const minified = await Terser.minify(data, terserOptions);
    fs.writeFileSync(filePath, minified.code);
  });
}

const files = getAllFiles("./build");
minifyFiles(files);
