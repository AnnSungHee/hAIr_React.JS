const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    "@babel/plugin-proposal-private-property-in-object"
  )
);
