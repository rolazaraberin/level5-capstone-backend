const path = require("path");
const nodeExternals = require("webpack-node-externals");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/*********************************************
 * EXPORT WEBPACK OPTIONS
 *********************************************/
module.exports = {
  entry: getEntryOptions(),
  externals: getNodeExternals(),
  mode: getModeOptions(),
  module: getModuleOptions(),
  optimization: getOptimizationOptions(),
  output: getOutputOptions(),
  plugins: getPluginsOptions(),
  resolve: getResolveOptions(),
  target: getTarget(),
};

function getEntryOptions() {
  //INFO - https://webpack.js.org/configuration/entry-context/#entry
  const entryOptions = {
    index: "./build/src/index", //THE EXTENSION IS CHOSEN BY THE RESOLVE OPTION
  };
  return entryOptions;
}

function getNodeExternals() {
  return [nodeExternals()];
}

function getModeOptions() {
  const modeOptions = "production";
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

  //LOAD TYPESCRIPT OPTIONS FROM tsconfig.json
  let tsloaderRules = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };
  rulesOptions.push(tsloaderRules);

  //TRANSLATE JAVASCRIPT AND TYPESCRIPT WITH BABEL
  //INFO - https://webpack.js.org/loaders/babel-loader/
  //RETAIN LINE NUMBERS - https://babeljs.io/docs/en/options#retainlines
  let babelLoaderPresets = {
    loader: "babel-loader", //USES OPTIONS IN babel.config.js
    // options: {
    //   presets: [
    //     "@babel/preset-env",
    //     // "@babel/preset-react",
    //     "@babel/preset-typescript",
    //   ],
    //   plugins: [["@babel/plugin-proposal-decorators", { version: "legacy" }]],
    //   retainLines: true,
    // },
  };
  let babelLoaderRules = {
    test: /\.jsx?$/, //MATCH JAVASCRIPT OR TYPESCRIPT FILES
    // test: /\.(ts|tsx|js)?$/, //MATCH JAVASCRIPT OR TYPESCRIPT FILES
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

function getOptimizationOptions() {
  //TERSER PLUGIN - INCLUDES MANY OPTIONS
  //UGLIFY - https://webpack.js.org/plugins/terser-webpack-plugin/#uglify-js
  //OPTIONS - https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
  const optimizationOptions = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false, //TRUE CAUSES DATABASE ERRORS
          keep_classnames: true,
          keep_fnames: true,
          compress: {
            defaults: true,
            unused: false, //TRUE CAUSES DATABASE ERRORS
            // defaults: false,
            // arrows: true,
            // booleans: true,
            // collapse_vars: true,
            // comparisons: true,
            // conditionals: true,
            // dead_code: true,
            // directives: true,
            // drop_debugger: true,
            // evaluate: true,
            // hoist_props: true,
            // if_return: true,
            // inline: true,
            // join_vars: true,
            // keep_fargs: true,
            // loops: true,
            // negate_iife: true,
            // properties: true,
            // reduce_vars: true,
            // reduce_funcs: true,
            // sequences: true,
            // side_effects: true,
            // switches: true,
            // typeofs: true,
          },
        },
      }),
    ],
  };
  return optimizationOptions;
}

function getPluginsOptions() {
  const pluginsOptions = [];

  //DYNAMICALLY INJECT JAVASCRIPT INTO HTML DOM HEAD
  //INFO - https://webpack.js.org/plugins/html-webpack-plugin
  const htmlWebpackPluginOptions = {
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
    path: path.resolve(__dirname, "./dist/src"), //PLACE WEBPACK FILES IN THIS DIRECTORY
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
    extensions: [".tsx", ".ts", ".js", "..."],

    //ALIAS - https://webpack.js.org/configuration/resolve/#resolvealias
    //ALLOWS IMPORT FROM THE ALIAS INSTEAD OF RELATIVE PATH
    //EXAMPLE import Title from "components/Title" instead of "../../components/Title"
    alias: {
      assets: path.resolve("./src/assets/"),
      bootstrap: path.resolve("./node_modules/bootstrap/"),
      components: path.resolve("./src/components/"),
      controllers: path.resolve("./src/controllers/"),
      modules: path.resolve("./src/modules/"),
      data: path.resolve("./src/data/"),
      models: path.resolve("./src/models/"),
      project: path.resolve("./src/project/"),
      public: path.resolve("./public/"),
      renderers: path.resolve("./src/renderers/"),
      views: path.resolve("./src/views/"),
      routes: path.resolve("./src/routes/"),
      root: path.resolve("./"),
      scripts: path.resolve("./src/scripts/"),
      utils: path.resolve("./src/utils/"),
      scss: path.resolve("./src/scss/"),
      skills: path.resolve("./src/skills/"),
      src: path.resolve("./src/"),
    },
  };
  return resolveOptions;
}

function getTarget() {
  return "node";
}
