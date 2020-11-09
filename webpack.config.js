const path = require("path");

module.exports = {
  entry: [
    "./js/constants.js",
    "./js/backend.js",
    "./js/card.js",
    "./js/popup.js",
    "./js/pin.js",
    "./js/debounce.js",
    "./js/form.js",
    "./js/utils.js",
    "./js/map.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
