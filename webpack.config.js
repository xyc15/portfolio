var path = require('path');// this package is a part of node, we use it to generate an absolute path.

module.exports = {
  entry: {  //which files to look at to create its bundle
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: { //use webpack to bundle js
    path: path.resolve(__dirname, "./app/temp/scripts"), //"__dirname" will create an absolute path to the current folder on our computer.  "./...  is a relative path"
    filename: "[name].js"
  },
  module: { //use webpack to convert js-
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/, //this regular expression means we just want this babel loader or plugin to be applied to javascript files and nothing else.
        exclude: /node_modules/  //these javascript files (in the entire node_modules folders) are not required to be converted by babel
      }
    ]
  }
}
