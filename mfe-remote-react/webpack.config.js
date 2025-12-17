const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { withModuleFederation } = require('@nx/react/module-federation');

const baseConfig = require('./module-federation.config');

module.exports = composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(baseConfig)
);