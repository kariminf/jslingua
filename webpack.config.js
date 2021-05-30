module.exports = {
  mode: 'development',
  entry: "./package/jslingua-static.js",
  output: {
    filename: 'jslingua.js',
    library: 'JsLingua',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};
