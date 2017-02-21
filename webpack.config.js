const webpack = require("webpack");
const fs = require("fs");

let camelize = function(string) {
  let almost = string.replace(/(\_\w)/g, matches => matches[1].toUpperCase())

  return almost[0].toUpperCase() + almost.slice(1);
};

let filename = (path) => (path.split("/").pop().split(".").slice(0, -1).join(""));

let allFilesIn = function(dir) {
  var results = [];

  fs.readdirSync(dir).forEach(function(file) {
      let path = dir + '/' + file;
      let stat = fs.statSync(path);

      if(stat && stat.isDirectory()) {
        results = results.concat(allFilesIn(path))
      }
      else {
        results.push(path);
      }
  });

  return results;
};

let components = allFilesIn(__dirname + "/app/assets/javascripts/webpack/root_components/").
  map((path) => {
    return { test: require.resolve(path), loader: `expose-loader?${camelize(filename(path))}` }
  });

let config = {
  entry: {
    fetch: 'whatwg-fetch',
    application: __dirname + "/app/assets/javascripts/webpack/application_entry.js"
  },

  output: {
    path: __dirname + "/app/assets/javascripts",
    filename: "[name]_bundle.js"
  },

  module: {
    rules: components.concat([
      {
        test: /\.(js|jsx)$/,
        include: __dirname + "/app/assets/javascripts/webpack",
        loader: "babel-loader",
        query: {
          presets: [["es2015", { "modules": false }], "react", "stage-2"]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ])
  }
};

module.exports = config;
