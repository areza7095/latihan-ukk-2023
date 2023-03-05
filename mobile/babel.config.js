module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [["nativewind/babel", { mode: "compileOnly" }]],
    },
  },
};
