module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@configs': './src/configs',
          '@containers': './src/containers',
          '@navigations': './src/navigations',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@services': './src/services',
          '@themes': './src/themes',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
