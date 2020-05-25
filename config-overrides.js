const path = require('path');
const fs = require('fs');
// const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const {
   override,
   addWebpackAlias,
   babelExclude,
   // addBabelPlugin,
   babelInclude,
   fixBabelImports,
   addWebpackModuleRule,
   removeModuleScopePlugin,
   getBabelLoader
} = require('customize-cra');

module.exports = override(
   addWebpackAlias({
      "react": path.resolve('./node_modules/react')
   }),
   babelInclude([fs.realpathSync("src"), fs.realpathSync("./node_modules/moufette-widget")]),
   addWebpackModuleRule({ test: /\.txt$/, use: 'raw-loader' }),
   fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
   }),
);