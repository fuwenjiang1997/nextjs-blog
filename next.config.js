const withPlugins = require('next-compose-plugins');
const withAntdLess = require('next-plugin-antd-less');

const __DEV__ = true

const pluginAntdLess = withAntdLess({
  modifyVars: {},
  lessVarsFilePath: './styles/antd.less',
  cssLoaderOptions: {
    mode: "local",
    localIdentName: __DEV__ ? "[local]--[hash:base64:4]" : "[hash:base64:8]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
    exportLocalsConvention: "camelCase",
    exportOnlyLocals: false,
    getLocalIdent: (context, localIdentName, localName, options) => {
      return "whatever_random_class_name";
    },
  },
});

module.exports = withPlugins([
  [pluginAntdLess]
], {
  strictMode: true,
  webpack(config) {
    return config;
  },
});