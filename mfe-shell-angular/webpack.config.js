// webpack.config.js (HOST)
const { withModuleFederationPlugin, shareAll } =
  require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'ng-host',
  remotes: {
    // để trống: ta load dynamic bằng URL (tốt cho nhiều môi trường)
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: false, requiredVersion: false }),
    react: { singleton: true, requiredVersion: false },
    'react-dom': { singleton: true, requiredVersion: false },
    'react-dom/client': { singleton: true, requiredVersion: false },
  },
});
