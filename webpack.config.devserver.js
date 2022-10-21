const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*********************************************
 * EXPORT WEBPACK OPTIONS
 *********************************************/
module.exports = {
  entry: getEntryOptions(),
  devServer: getDevServerOptions(),
  devtool: getDevtoolOptions(),
  mode: getModeOptions(),
  module: getModuleOptions(),
  output: getOutputOptions(),
  plugins: getPluginsOptions(),
  resolve: getResolveOptions(),
};

function getEntryOptions() {
  //INFO - https://webpack.js.org/configuration/entry-context/#entry
  const entryOptions = {
    index: "./src/index.js",
  };
  return entryOptions;
}
function getDevServerOptions() {
  //INFO - https://www.robinwieruch.de/webpack-react-router/
  //INFO - https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback

  const devServerOptions = {
    static: {
      directory: path.join(__dirname, "./public"),
    },
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
      reconnect: 5,
    },
    historyApiFallback:
      //true,
      //SERVER LOADS index.js FROM "/" INSTEAD OF CURRENT LOCATION
      //INFO - https://ui.dev/react-router-cannot-get-url-refresh
      {
        rewrites: [
          { from: /index.js/, to: "/index.js" },
          { from: /index.css/, to: "/index.css" },
          { from: /\.ico$/, to: "/" },
          //{ from: /\.css$/, to: "/css/" },
        ],
      },
    compress: true,
    port: 8080,
  };
  return devServerOptions;
}
function getDevtoolOptions() {
  //ORIGINAL LINES - https://webpack.js.org/configuration/devtool/#devtool

  // const devtoolOptions = "eval-source-map";
  // const devtoolOptions = "eval-cheap-module-source-map";
  // const devtoolOptions = "eval-nosources-source-map";
  const devtoolOptions = "inline-source-map";
  // const devtoolOptions = "source-map";
  // const devtoolOptions = "hidden-source-map";
  return devtoolOptions;
}
function getModeOptions() {
  //const modeOptions = "production";
  const modeOptions = "development";
  return modeOptions;
}
function getModuleOptions() {
  //RULES ARE OPTIONS OF MODULES

  const rulesOptions = [];

  //GATHER ASSETS (PICTURES) IN HTML FILE
  //INFO - https://webpack.js.org/loaders/html-loader
  const htmlRegex = /\.html$/; //MATCH DIFFERENT PICTURE FORMATS WITH OR |
  const htmlLoaders = ["html-loader"];
  rulesOptions.push({
    test: htmlRegex,
    use: htmlLoaders,
  });

  //BUNDLE PICTURES FROM HTML FILE
  //INFO - https://webpack.js.org/guides/asset-modules
  const picturesRegex = /\.(jpg|svg|png|gif|ico)$/; //MATCH DIFFERENT PICTURE FORMATS WITH OR |
  const typeOptions = "asset/resource";
  rulesOptions.push({
    test: picturesRegex,
    type: typeOptions,
  });

  //TRANSLATE JAVASCRIPT AND TYPESCRIPT WITH BABEL
  //INFO - https://webpack.js.org/loaders/babel-loader/
  //RETAIN LINE NUMBERS - https://babeljs.io/docs/en/options#retainlines
  let babelLoaderPresets = {
    loader: "babel-loader",
    // options: {
    //   presets: [
    //     "@babel/preset-react",
    //     "@babel/preset-env",
    //     "@babel/preset-typescript",
    //   ],
    //   retainLines: true,
    // },
  };
  let babelLoaderRules = {
    test: /\.(ts|tsx|js)?$/, //MATCH JAVASCRIPT OR TYPESCRIPT FILES
    // test: /\.js$/, //MATCH JAVASCRIPT OR TYPESCRIPT FILES
    exclude: /node-modules/, //MATCH NODE_MODULES
    use: babelLoaderPresets,
  };
  rulesOptions.push(babelLoaderRules);

  //DYNAMICALLY INJECT CSS FILE INTO HTML DOM HEAD
  const miniCssExtractPluginRules = {
    test: /\.(s)css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  };
  rulesOptions.push(miniCssExtractPluginRules);

  //MODULE OPTIONS
  const moduleOptions = { rules: rulesOptions };
  return moduleOptions;
}
function getPluginsOptions() {
  const pluginsOptions = [];

  //DYNAMICALLY INJECT JAVASCRIPT INTO HTML DOM HEAD
  //INFO - https://webpack.js.org/plugins/html-webpack-plugin
  htmlWebpackPluginOptions = {
    template: "./src/index.html", //USE THIS FILE INSTEAD OF AN EMPTY HTML
    //filename: "index.html", //OVERRIDE DEFAULT FILENAME INDEX.HTML
  };
  pluginsOptions.push(new HtmlWebpackPlugin(htmlWebpackPluginOptions));

  //DYNAMICALLY INJECT CSS FILE INTO HTML DOM HEAD
  //INFO - https://webpack.js.org/plugins/mini-css-extract-plugin
  const miniCssExtractPluginOptions = {
    //filename: "[name].css", //DEFAULT
    //filename: "[contenthash].css",
  };
  pluginsOptions.push(new MiniCssExtractPlugin(miniCssExtractPluginOptions));

  return pluginsOptions;
}
function getOutputOptions() {
  //INFO - https://webpack.js.org/concepts/output
  const outputOptions = {
    path: path.resolve(__dirname, "./dist"), //PLACE WEBPACK FILES IN DIST DIRECTORY
  };
  return outputOptions;
}
function getResolveOptions() {
  //DUPLICATE REACT - https://blog.maximeheckel.com/posts/duplicate-dependencies-npm-link/
  //NPM LINK - https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
  //WEBPACK RESOLVE - https://webpack.js.org/configuration/resolve/
  const resolveOptions = {
    //EXTENSIONS - https://webpack.js.org/configuration/resolve/#resolveextensions
    //PRIORITIZES IMPORT EXTENSIONS, STARTING WITH INDEX 0
    //EXAMPLE import Title from "components/Title" WILL CHECK FOR Title.tsx FIRST
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],

    //ALIAS - https://webpack.js.org/configuration/resolve/#resolvealias
    //ALLOWS IMPORT FROM THE ALIAS INSTEAD OF RELATIVE PATH
    //EXAMPLE import Title from "components/Title" instead of "../../components/Title"
    alias: {
      assets: path.resolve("./src/assets/"),
      bootstrap: path.resolve("./node_modules/bootstrap/"),
      components: path.resolve("./src/components/"),
      project: path.resolve("./src/project/"),
      public: path.resolve("./public/"),
      renderers: path.resolve("./src/renderers/"),
      root: path.resolve("./"),
      scripts: path.resolve("./src/scripts/"),
      scss: path.resolve("./src/scss/"),
      skills: path.resolve("./src/skills/"),
    },
  };
  return resolveOptions;
}
