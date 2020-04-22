const path = require('path');
const {
   override,
   // addWebpackAlias,
   fixBabelImports,
   addWebpackModuleRule,
} = require('customize-cra');


module.exports = override(
   // addWebpackAlias({
   //    "moufette-front": path.resolve('src'),
   // }),
   addWebpackModuleRule({ test: /\.txt$/, use: 'raw-loader' }),
   fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
   }),
);