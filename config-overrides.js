const path = require('path');
const {
   override,
   addWebpackAlias,
   fixBabelImports
} = require('customize-cra');


module.exports = override(
   // addWebpackAlias({
   //    "moufette-front": path.resolve('src'),
   // }),
   fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
   }),
);